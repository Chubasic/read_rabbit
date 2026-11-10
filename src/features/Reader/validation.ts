import { z } from 'zod';

const MAX_FILE_SIZE_BYTES = 100 * 1000 * 1000 // 100MB
const ALLOWED_EXTENSIONS = ['pdf', 'epub', 'fb2'];

export const textFileSchema = z.instanceof(File).refine((file: File) => {
  return ALLOWED_EXTENSIONS.includes(file.type)
}, {
  message: `Only PDF, EPUB, and FB2 files are allowed.`,
}).refine((file: File) => {
  return file.size <= MAX_FILE_SIZE_BYTES
})
  ;

export type FileValidation = z.infer<typeof textFileSchema>;
