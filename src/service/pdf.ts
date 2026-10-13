import { getDocument } from "pdfjs-dist";
import {
  DocumentInitParameters,
  PDFDocumentProxy,
} from "pdfjs-dist/types/src/display/api";

/**
 * Reads a PDF from a File and returns the PDFDocumentProxy.
 */
export async function readPDF(file: File): Promise<PDFDocumentProxy> {
  const fileURI = URL.createObjectURL(file)
  const params: DocumentInitParameters = {
    url: fileURI,
  };

  const loadingTask = getDocument(params);
  return await loadingTask.promise;
}
