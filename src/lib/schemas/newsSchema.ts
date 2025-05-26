import { z } from "zod";

export const newsSchema = z.object({
  title: z.string().min(1, "Обов'язкове поле"),
  summary: z.string().min(1, "Обов'язкове поле"),
  mainTag: z
    .string()
    .min(1, "Обов'язкове поле")
    .max(16, "Тег не може бути таким довгим"),
  publicationDate: z.string().min(1, "Обов'язкове поле"),
  thumbnailPath: z.instanceof(File).optional(),
  otherTags: z.array(z.string().min(1, "Обов'язкове поле")),
  photoPaths: z.array(z.instanceof(File)).optional(),
  body: z.string(),
});

export type NewsFormValues = z.infer<typeof newsSchema>;
