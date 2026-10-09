import { getDocument } from "pdfjs-dist";
import {
  DocumentInitParameters,
  PDFDocumentProxy,
} from "pdfjs-dist/types/src/display/api";

/**
 * Reads a PDF from a Uint8Array and returns the PDFDocumentProxy.
 */
export async function readPDF(fileData: Uint8Array): Promise<PDFDocumentProxy> {
  const params: DocumentInitParameters = {
    data: fileData,
  };

  const loadingTask = getDocument(params);
  return await loadingTask.promise;
}

/**
 * Iterates through pages of a PDF and logs their viewports.
 * In a browser environment, this is where you would perform canvas rendering.
 */
export async function renderPages(
  pdfDocProxy: PDFDocumentProxy,
): Promise<void> {
  for (let pageNum = 1; pageNum <= pdfDocProxy.numPages; pageNum++) {
    const page = await pdfDocProxy.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.0 });

    // Note: Actual canvas rendering requires a DOM element and 2D context.
    // In a non-browser environment, this might be used for layout calculation or text extraction.
    console.log(
      `Page ${pageNum} viewport: ${viewport.width}x${viewport.height}`,
    );
  }
}
