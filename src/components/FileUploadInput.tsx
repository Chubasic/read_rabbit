import { FunctionalComponent } from 'preact';
import { useCallback } from 'preact/hooks';
import { Input } from './Input.tsx';

export type FileUploadProps = {
  /** Placeholder text shown when no file is selected. */
  placeholder?: string;
  /** Disables the input if true. */
  disabled?: boolean;
  /** Callback with the selected FileList (or null if cleared). */
  onFilesChange?: (files: FileList | null) => void;
};

export const FileUploadInput: FunctionalComponent<FileUploadProps> = ({
  placeholder = '',
  disabled = false,
  onFilesChange,
}) => {
  const handleChange = useCallback(
    (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if (onFilesChange) onFilesChange(files);
    },
    [onFilesChange]
  );

  return (
    <Input
      type="file"
      placeholder={placeholder}
      disabled={disabled}
      onChange={handleChange}
    />
  );
};
