import { invoke } from '@tauri-apps/api/core';
import { ComponentChildren, FunctionComponent } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import { FileUploadInput } from "../../components/FileUploadInput.tsx";
import ReaderToolobar from "./ReaderTools/ReaderToolbar.tsx";
// import z from "zod";
// import { validateFile } from "../../utility/validateFile.ts";
// import { textFileSchema } from "./validation.ts";
import PlusIcon from "../../components/icons/PlusIcon.tsx";
import PDFReader from "./components/PDFReader.tsx";

type Reader = typeof PDFReader | any;

enum Languages {
  English = "English"
}

type Props = {
  children: ComponentChildren;
};


const Reader: FunctionComponent<Props> = ({ children }: Props) => {
  const [fileOpenError, setFileOpenError] = useState<string | undefined>(
    undefined,
  );
  const [file, setFile] = useState<File | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null)
  const [language, setLanguage] = useState<Languages>(Languages.English)

  const onFilesSelected = useCallback(
    (filesMap: Map<string, File> | null) => {
      if (!filesMap) return;
      // Take the first file in the map
      const [path, file] = filesMap.entries().next().value || []

      if (!file || !path) return;
      console.log(file)
      console.log("Size", file.size)
      console.log(path)

      setFile(file);
      setFilePath(path);

      // }
    },
    [setFileOpenError, fileOpenError, setFile, filePath],
  );


  useEffect(() => {
    function cleanup() { }
    if (!file) return cleanup

    invoke('save_book', {
      presave_book: {
        path: filePath,
        title: file.name,
        language,
      }
    });


    return cleanup
  }, [filePath])

  function readerStrategy(fileData: File) {
    if (!(fileData instanceof File)) {
      throw new Error("File data must be a File instance");
    }

    const extension = fileData.type;
    switch (extension) {
      case "pdf": {
        return <PDFReader file={fileData} />;
      }
      case "fb2":
        console.log("Handling FB2 file has not been implemented");
        return null;
      case "epub":
        console.log("Handling EBUP file has not been implemented");
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
