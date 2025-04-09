import { z } from "zod";

const fieldOfStudySchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
});

const specialitySchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
});

// const ProgramDocumentId = z.object({
//   id: z.number(),
//   filename: z.string(),
//   filepath: z.string(),
//   uploaddate: z.string(),
//   filesize: z.number(),
//   contenttype: z.string(),
// });

const programCharacteristicsSchema = z.object({
  area: z.object({
    object: z.string().refine((string) => string.trim().length > 0, {
      message: "Введіть об'єкти",
    }),
    aim: z.string().refine((string) => string.trim().length > 0, {
      message: "Введіть об'єкти",
    }),
    theory: z.string().refine((string) => string.trim().length > 0, {
      message: "Введіть об'єкти",
    }),
    methods: z.string().refine((string) => string.trim().length > 0, {
      message: "Введіть об'єкти",
    }),
    instruments: z.string().refine((string) => string.trim().length > 0, {
      message: "Введіть об'єкти",
    }),
  }),
  focus: z.string().refine((string) => string.trim().length > 0, {
    message: "Введіть об'єкти",
  }),
  features: z.string().refine((string) => string.trim().length > 0, {
    message: "Введіть об'єкти",
  }),
});

export const programSchema = z.object({
  name: z.string().min(1, "Обов'язкове поле"),
  degree: z.enum(["phd", "doc"]),
  accredited: z.boolean(),
  fieldOfStudy: fieldOfStudySchema.refine(
    (data) => data.code !== "" && data.name !== "",
    {
      message: "Обов'язкове поле",
    },
  ),
  speciality: specialitySchema.refine(
    (data) => data.code !== "" && data.name !== "",
    {
      message: "Обов'язкове поле",
    },
  ),
  form: z.array(z.string()).refine((arr) => arr.length > 0, {
    message: "Обов'язкове поле",
  }),
  purpose: z
    .string()
    .refine((string) => string.trim().length > 0, {
      message: "Введіть об'єкти",
    })
    .optional(),
  years: z
    .number()
    .min(1, "Такого не може бути")
    .max(5, "Такого не може бути")
    .optional(),
  credits: z
    .number()
    .min(1, "Такого не може бути")
    .max(500, "Такого не може бути")
    .optional(),
  programCharacteristics: programCharacteristicsSchema.optional(),
  descriptions: z
    .string()
    .refine((string) => string.trim().length > 0, {
      message: "Введіть опис",
    })
    .optional(),
  objects: z
    .string()
    .refine((string) => string.trim().length > 0, {
      message: "Введіть об'єкти",
    })
    .optional(),
  directions: z.array(z.string()).optional(),
  linkFaculty: z.string().url("Введіть валідну URL"),
  programDocumentId: z.instanceof(File),
});

export type ProgramFormValues = z.infer<typeof programSchema>;
