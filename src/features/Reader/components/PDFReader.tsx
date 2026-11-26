GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
import { readPDF } from "../../../service/pdf.ts";
import {
  GlobalWorkerOptions,
  type PageViewport,
  type PDFDocumentProxy,
  type PDFPageProxy,
} from "pdfjs-dist";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { CanvasLayer, TextLayer } from "./PDFReader/layers/index.ts";
import { useBookContext } from "../context/BookContext";

type PDFReaderProps = {
  file: File;
};

export default function PDFReader({ file }: PDFReaderProps) {
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const { currentPage, setTotalPages } = useBookContext();

  const [error, setError] = useState<string | null>(null);
  const [viewport, setViewport] = useState<PageViewport | null>(null);
  const [clientWidth, setClientWidth] = useState<number | null>(null)

  const [page, setPage] = useState<PDFPageProxy | null>(null);

  const observerRef = useRef<ResizeObserver | null>(null);

  const measureRef = useCallback((el: HTMLDivElement | null) => {
    observerRef.current?.disconnect();
    if (!el) return;
    setClientWidth(el.clientWidth); // initial measure
    const ro = new ResizeObserver(([entry]) => {
      setClientWidth(entry.contentRect.width);
    });
    ro.observe(el);
    observerRef.current = ro;
  }, []);

  // 1. Load the document whenever the file changes
  // Remove page/viewport load from file change effect
  useEffect(() => {
    setPdfDoc(null);
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
    if (!clientWidth) return;
    let cancelled = false;

    const loadPage = async () => {

      if (cancelled) return;
      try {
        const page = await pdfDoc.getPage(currentPage);
        const baseViewport = page.getViewport({ scale: 1 });
        const cssScale = clientWidth / baseViewport.width;
        const viewport = page.getViewport({ scale: cssScale });

        setPage(page);
        setTotalPages(pdfDoc.numPages);
        setViewport(viewport);
      } catch (e: unknown) {
        setError((e as Error)?.message ?? "Failed to load page");
      }
    };
    loadPage();
    return () => {
      cancelled = true;
    };
  }, [pdfDoc, currentPage, clientWidth, setTotalPages]);

  if (error) return <p class="text-red-600">{error}</p>;
  if (!pdfDoc) return <p>Loading…</p>;

  return (
    <div ref={measureRef} class="w-full">
      <div className="relative mx-auto"
        style={{
          width: viewport?.width,
          height: viewport?.height,
          ["--user-unit" as string]: 1,
          ["--total-scale-factor" as string]: viewport?.scale,

        }}>
        <CanvasLayer page={page} viewport={viewport} pageNum={currentPage} />
        <TextLayer page={page} viewport={viewport} pageNum={currentPage} />
      </div>
    </div>
  );
}
