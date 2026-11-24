import {
  type PageViewport,
  type PDFPageProxy,
  RenderTask,
  RenderingCancelledException,
} from "pdfjs-dist";
import { useEffect, useRef, useState } from "preact/hooks";

type Props = {
  page: PDFPageProxy | null;
  viewport: PageViewport | null;
  pageNum?: number;
};

export default function CanvasLayerComponent({
  page,
  viewport,
  pageNum = 1,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!page || !viewport) return;

    let renderTask: RenderTask | null = null;
    let cancelled = false;

    const render = async () => {
      try {
        if (cancelled) return;

        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!canvas || !context) return;


        const dpr = globalThis.devicePixelRatio || 1;

        canvas.width = Math.floor(viewport.width * dpr);
        canvas.height = Math.floor(viewport.height * dpr);
        // canvas.width = viewport.width;
        // canvas.height = viewport.height;
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        renderTask = page.render({
          canvas, canvasContext: context, viewport, transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : undefined,
        });
        await renderTask.promise;
      } catch (e: unknown) {
        if (!(e instanceof RenderingCancelledException)) {
          setError((e as Error)?.message ?? "Failed to render page");
        }
      }
    };

    render();
    return () => {
      cancelled = true;
      renderTask?.cancel();
    };
  }, [page, viewport, pageNum]);

  if (error) return <p class="text-red-400">{error}</p>;
  return (
    <canvas ref={canvasRef} />
  );
}
