import { DialogFilter, open } from "@tauri-apps/plugin-dialog";
import { readFile } from "@tauri-apps/plugin-fs";

import { ComponentChildren, FunctionalComponent } from "preact";
import { useCallback } from "preact/hooks";
import Button from "./Button.tsx";
import { extname } from "@tauri-apps/api/path";

export type FileUploadProps = {
  multiple?: boolean;
  /** Disables the input if true. */
  disabled?: boolean;
  /** Callback with the selected FileList (or null if cleared). */
  onFilesChange?: (files: Map<string, File> | null) => void;
  /** Accepted file formats  */
  accepted?: DialogFilter[];
  children: ComponentChildren;
};

// In the future, I should adopt https://developer.mozilla.org/en-US/docs/Web/API/Window/showOpenFilePicker

export const FileUploadInput: FunctionalComponent<FileUploadProps> = ({
  disabled = false,
  multiple = false,
  // accepted = [{
  //   name: "default", extensions: [.pdf, .epub, fb2]
  // }], // TODO: does not work for reasons I care very little rn. Pass open configuration as prop.
  onFilesChange,
  children = "Open",
}) => {

  const fileSelectDialog = useCallback(async () => {
    const filePath = await open({
      multiple: multiple,
      directory: false,
      read: true,
      filters: [{
        name: "default", extensions: ["pdf", "epub", "fb2"]
      }],

    });
    if (filePath) {
      if (onFilesChange) {
        const map = new Map<string, File>();
        const paths = Array.isArray(filePath) ? filePath : [filePath];
        for (const path of paths) {
          const fileContent = await readFile(path);
          const fileName: string = path
            .split("/")
            .pop()
            .replace(/\.[^.]*$/, "");

          const newFile = new File([fileContent], fileName, {
            lastModified: Date.now(),
            type: await extname(path)

          });
          map.set(path, newFile);
        }
        onFilesChange(map);
      }
    }
  }, [multiple, onFilesChange]);


  return (
    <>
      <Button onClick={fileSelectDialog} disabled={disabled}>
        {children}
      </Button>
    </>
  );
};
