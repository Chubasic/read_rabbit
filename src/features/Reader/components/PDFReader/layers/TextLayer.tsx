import {
  type PageViewport,
  type PDFPageProxy,
  TextLayer as PdfTextLayer,
  RenderingCancelledException,
} from "pdfjs-dist";
import { useEffect, useRef, useState } from "preact/hooks";

interface Props {
  viewport: PageViewport | null;
  page: PDFPageProxy | null;
  pageNum?: number;
}

/**
 * Renders the selectable text layer on top of a PDF page.
 *
 * It mirrors the logic in `CanvasLayer` but uses the PDF.js
 * `TextLayer` class to create a text layer that sits above the
 * canvas. The layer is rendered into a `<div>` element with the
 * class `pdf-layer__text`.
 */
export default function TextLayerComponent({
  viewport,
  page,
  pageNum = 1,
}: Props) {
  const textLayerRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!page || !viewport) return;

    let textLayer: PdfTextLayer | null = null;

    const render = async () => {
      try {
      const textLayerElem = textLayerRef.current
        if (!textLayerElem) return;
        textLayerElem.style.width = `${viewport.width}px`;
        textLayerElem.style.height = `${viewport.height}px`;
        // Create a new TextLayer instance for the page.
        textLayer = new PdfTextLayer({
          textContentSource: page.streamTextContent(),
          container: textLayerElem,
          viewport,
        });

        await textLayer.render();
      } catch (e: unknown) {
        if (e instanceof RenderingCancelledException) {
          setError(e.message);
        }
      }
    };

    render();

    return () => {
      // Clear the container to avoid stale content.
      if (textLayerRef.current) {
        textLayerRef.current.innerHTML = "";
      }
    };
  }, [page, viewport, pageNum]);

  if (error) return <p class="text-red-400">{error}</p>;
  if (!page || !viewport) return null;
  return (
    <div
      ref={textLayerRef}
      class="textLayer absolute top-0 left-0"
    ></div>
  );
}

// Re-export under a conventional name for index.ts to use.
export const TextLayer = TextLayerComponent;
