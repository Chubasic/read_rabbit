import z from "zod";

export function validateFile<T>(file: File, schema:  z.ZodInstanceOf<T>) {
  return schema.safeParse(file);

}
