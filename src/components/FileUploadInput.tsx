import { ComponentChildren, FunctionalComponent } from 'preact';
import { useCallback, useRef } from 'preact/hooks';
import Button from './Button.tsx';

export type FileUploadProps = {
  multiple?: boolean;
  /** Disables the input if true. */
  disabled?: boolean;
  /** Callback with the selected FileList (or null if cleared). */
  onFilesChange?: (files: FileList | null) => void;
  /** Accepted file formats  */
  accepted?: string,
  children: ComponentChildren
};


// In the future, I should adopt https://developer.mozilla.org/en-US/docs/Web/API/Window/showOpenFilePicker

export const FileUploadInput: FunctionalComponent<FileUploadProps> = ({
  disabled = false,
  multiple = false,
  accepted = "image/*",
  onFilesChange,
  children = "Open"
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    if (ref.current) {
      ref.current.click();
    }
  }, [ref.current])

  const handleChange = useCallback(
    (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if (onFilesChange) onFilesChange(files);
    },
    [onFilesChange]
  );
// Not only text should be accepted as
  return (
    <>
    <input type="file" multiple={multiple} accept={accepted} ref={ref} onChange={handleChange} class="hidden" />
      <Button onClick={handleClick} disabled={disabled}>{children}</Button>
    </>
  );
};
