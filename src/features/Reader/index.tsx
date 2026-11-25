import z from 'zod';
import { invoke } from '@tauri-apps/api/core';
import { ComponentChildren, FunctionComponent } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import { FileUploadInput } from "../../components/FileUploadInput.tsx";
import ReaderToolobar from "./ReaderTools/ReaderToolbar.tsx";
import PlusIcon from "../../components/icons/PlusIcon.tsx";
import PDFReader from "./components/PDFReader.tsx";
import { validateFile } from '../../utility/validateFile.ts';
import { textFileSchema } from './validation.ts';

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
  const [bookId, setBookId] = useState<string | null>(null)

  const onFilesSelected = useCallback(
    (filesMap: Map<string, File> | null) => {
      if (!filesMap) return;
      // Take the first file in the map
      const [path, file] = filesMap.entries().next().value || []

      if (!file || !path) return;
      const result = validateFile(file, textFileSchema);
      if (result.error) {
        setFileOpenError(z.treeifyError(result.error).errors[0]);
      }
      setFile(file);
      setFilePath(path);

      // }
    },
    [setFileOpenError, fileOpenError, setFile, filePath],
  );


  useEffect(() => {
    async function saveBook() {
      if (!file || !filePath) return;
      const bookId: string = await invoke('save_book', {
        presave_book: {
          path: filePath,
          title: file.name,
          language,
        }
      });
      setBookId(bookId)
      console.log('Saved book with ID:', bookId);
    }
    saveBook();
    return () => { };
  }, [filePath, file, language])

  const readerStrategy = useCallback(function (fileData: File, bookId: string) {
    if (!(fileData instanceof File)) { setFileOpenError("File data must be a File instance"); return }

    const extension = fileData.type;
    switch (extension) {
      case "pdf": {
        return <PDFReader file={fileData} bookId={bookId} />;
      }
      case "fb2":
        setFileOpenError("Handling FB2 file has not been implemented");
        return null;
      case "epub":
        setFileOpenError("Handling EBUP file has not been implemented");
        return null;
      default:
        setFileOpenError(`Unsupported file format: ${extension}`);
    }
  }, [])

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
      {file && bookId && readerStrategy(file, bookId)}
    </div>
  );
};

export default Reader;
