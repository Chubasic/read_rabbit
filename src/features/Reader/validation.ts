import { z } from 'zod';

const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024 * 1024; // 2GB
const ALLOWED_EXTENSIONS = ['application/pdf', 'application/epub+zip', 'application/x-fictionbook+xml'];

export const textFileSchema = z.instanceof(File).refine((file: File) => {
    return ALLOWED_EXTENSIONS.includes(file.type)
  }, {
    message: `Only PDF, EPUB, and FB2 files are allowed.`,
  }).refine((file: File) => {
    return file.size <= MAX_FILE_SIZE_BYTES
  })
;

export type FileValidation = z.infer<typeof textFileSchema>;
