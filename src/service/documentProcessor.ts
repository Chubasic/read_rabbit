import { readPDF, renderPages } from "./pdf.ts";

/**
 * Reader strategy function with async/await.
 * Determines file type and applies the appropriate handling logic.
 */
export async function readerStrategy(fileData: Uint8Array): Promise<void> {
  if (!(fileData instanceof Uint8Array)) {
    throw new Error("File data must be a Uint8Array");
  }

  // Determine file type and apply reader strategy
  // Note: fileData.slice(-4) is a bit naive for complex extensions,
  // but serves for this example.
  const extension = fileData.slice(-4).toString().toLowerCase();
  switch (extension) {
    case ".pdf": {
      const pdfDoc = await readPDF(fileData);
      await renderPages(pdfDoc);
      break;
    }
    case ".fb2":
      // Placeholder for FB2 handling logic
      console.log("Handling FB2 file");
      break;
    case ".ebup":
      // Placeholder for EBUP handling logic
      console.log("Handling EBUP file");
      break;
    default:
      throw new Error(`Unsupported file format: ${extension}`);
  }
}

/**
 * Main function to read and handle files.
 * Orchestrates the reading process and handles errors.
 */
export async function readAndHandleFile(fileData: Uint8Array): Promise<void> {
  try {
    await readerStrategy(fileData);
  } catch (error) {
    console.error("Error reading or handling file:", error);
  }
}
