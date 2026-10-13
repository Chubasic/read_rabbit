import { readPDF } from "../../../service/pdf.ts";
import {
  GlobalWorkerOptions,
  type PageViewport,
  type PDFDocumentProxy,
  type PDFPageProxy,
} from "pdfjs-dist";
import { useCallback, useEffect, useState } from "preact/hooks";
import Button from "../../../components/Button.tsx";
import { CanvasLayer, TextLayer } from "./PDFReader/layers/index.ts";
GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
import "pdfjs-dist/web/pdf_viewer.css"; // styles for .textLayer

type PDFReaderProps = {
  file: File;
};

export default function PDFReader({ file }: PDFReaderProps) {
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [viewport, setViewport] = useState<PageViewport | null>(null);
  const [page, setPage] = useState<PDFPageProxy | null>(null);
  // 1. Load the document whenever the file changes
  // Remove page/viewport load from file change effect
  useEffect(() => {
    setPdfDoc(null);
    setPageNum(1);
    setError(null);

    const load = async () => {
      try {
        const pdfDoc = await readPDF(file);
        setPdfDoc(pdfDoc);
      } catch (e: unknown) {
        setError((e as Error)?.message ?? "Failed to open PDF");
      }
    };
    load();
  }, [file]);

  // Load page and viewport when pdfDoc or pageNum changes
  useEffect(() => {
    if (!pdfDoc) return;
    let cancelled = false;
    const loadPage = async () => {
      try {
        const page = await pdfDoc.getPage(pageNum);
        if (cancelled) return;
        const viewport = page.getViewport({
          scale: 1.5 * (globalThis.devicePixelRatio || 1),
        });
        setPage(page);
        setViewport(viewport);
      } catch (e: unknown) {
        setError((e as Error)?.message ?? "Failed to load page");
      }
    };
    loadPage();
    return () => {
      cancelled = true;
    };
  }, [pdfDoc, pageNum]);

  const prevPage = useCallback(
    () => setPageNum(pageNum - 1),
    [setPageNum, pageNum],
  );
  const nextPage = useCallback(
    () => setPageNum(pageNum + 1),
    [setPageNum, pageNum],
  );

  if (error) return <p class="text-red-600">{error}</p>;
  if (!pdfDoc) return <p>Loading…</p>;

  return (
    <div class="flex flex-col items-center gap-2">
      <div class="flex items-center gap-3">
        <Button disabled={pageNum <= 1} onClick={prevPage}>
          Prev
        </Button>
        <span>
          {pageNum} / {pdfDoc.numPages}
        </span>
        <Button disabled={pageNum >= pdfDoc.numPages} onClick={nextPage}>
          Next
        </Button>
      </div>
      <div class="relative" style={{ width: viewport?.width, height: viewport?.height,  }}>
        <CanvasLayer page={page} viewport={viewport} pageNum={pageNum} />
        <TextLayer page={page} viewport={viewport} pageNum={pageNum} />
      </div>
    </div>
  );
}
/*
<div class="pdf-layers" style={{ ... }} >
  <div class="pdf-layer__canvas">
     <canvas ref={canvasLayer} />
  </div>
  <div ref={textLayer} class="pdf-layer__text" />
  <div ref={annotationLayer} class="pdf-layer__annotation" />
</div>
*/
