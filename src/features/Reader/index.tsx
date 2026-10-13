import z from "zod";
import { ComponentChildren, FunctionComponent } from "preact";
import { useCallback, useState } from "preact/hooks";
import { FileUploadInput } from "../../components/FileUploadInput.tsx";
import ReaderToolobar from "./ReaderTools/ReaderToolbar.tsx";
import { validateFile } from "../../utility/validateFile.ts";
import { textFileSchema } from "./validation.ts";
import PlusIcon from "../../components/icons/PlusIcon.tsx";
import PDFReader from "./components/PDFReader.tsx";

type Reader = typeof PDFReader | any;

type Props = {
  children: ComponentChildren;
};

const Reader: FunctionComponent<Props> = ({ children }: Props) => {
  const [fileOpenError, setFileOpenError] = useState<string | undefined>(
    undefined,
  );
  const [file, setFile] = useState<File | null>(null);

  const onFilesSelected = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      const file = files[0];
      const result = validateFile(file, textFileSchema);
      if (result.error) {
        setFileOpenError(z.treeifyError(result.error).errors[0]);
        return;
      } else {
        setFileOpenError(undefined);
        setFile(file);
      }
    },
    [setFileOpenError, fileOpenError, setFile],
  );

  function readerStrategy(fileData: File) {
    if (!(fileData instanceof File)) {
      throw new Error("File data must be a File instance");
    }

    const extension = fileData.type;
    switch (extension) {
      case "application/pdf": {
        return <PDFReader file={fileData} />;
      }
      case "application/x-fictionbook+xml":
        console.log("Handling FB2 file");
        return null;
      case "application/epub+zip":
        console.log("Handling EBUP file");
        return null;
      default:
        throw new Error(`Unsupported file format: ${extension}`);
    }
  }

  return (
    <div className="w-full">
      <ReaderToolobar>
        <FileUploadInput
          onFilesChange={onFilesSelected}
          accepted=".pdf, .epub, .fb2"
        >
          <PlusIcon />
        </FileUploadInput>
        <p>{fileOpenError}</p>
      </ReaderToolobar>
      {children}
      {file && readerStrategy(file)}
    </div>
  );
};

export default Reader;
