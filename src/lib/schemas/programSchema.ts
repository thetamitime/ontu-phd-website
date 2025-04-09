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

// const programCharacteristicsSchema = z.object({
//   area: z.object({
//     object: z.string().min(1, "Введіть об'єкт програми"),
//     aim: z.string().min(1, "Введіть ціль програми"),
//     theory: z.string().min(1, "Введіть теоретичний зміст програми"),
//     methods: z.string().min(1, "Введіть методи програми"),
//     instruments: z.string().min(1, "Введіть інструменти програми"),
//   }),
//   focus: z.string().min(1, "Введіть фокус програми"),
//   features: z.string().min(1, "Введіть особливості програми"),
// });

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
  purpose: z.string().min(1, "Введіть мету програми").optional(),
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
  //programCharacteristics: programCharacteristicsSchema.optional(),
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
  //programDocumentId: z.instanceof(File),
});

export type ProgramFormValues = z.infer<typeof programSchema>;
