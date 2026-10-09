import type { ComponentChildren, FunctionComponent } from "preact";
import { useCallback, useState } from "preact/hooks";
import { FileUploadInput } from "../../components/FileUploadInput.tsx";
import ReaderToolobar from "./ReaderTools/ReaderToolbar.tsx";
import { validateFile } from "../../utility/validateFile.ts";
import { textFileSchema } from "./validation.ts";
import z from "zod";
import PlusIcon from "../../components/icons/PlusIcon.tsx";

type Props = {
    children: ComponentChildren;
}

const Reader: FunctionComponent<Props> = ({ children }: Props) => {
  const [fileOpenError, setFileOpenError] = useState<string | undefined>(undefined)

  const onFilesSelected = useCallback((files: FileList | null) => {
    if (!files) return
    const file = files[0];
    const result = validateFile(file, textFileSchema)
    result.error ? setFileOpenError(z.treeifyError(result.error).errors[0]) : setFileOpenError(undefined)


  }, [setFileOpenError, fileOpenError])


    return (
      <div className="w-full">
        <ReaderToolobar >
        <FileUploadInput
          onFilesChange={onFilesSelected}
          accepted=".pdf, .epub, .fb2"
          >
            <PlusIcon />
        </FileUploadInput>
        {<p>{fileOpenError}</p>}

        </ReaderToolobar>
        {children}
        </div>
    );
};

export default Reader;
