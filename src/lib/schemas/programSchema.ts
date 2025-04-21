import { z } from "zod";

const fieldOfStudySchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
});

const specialitySchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
});

const instituteSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
});

const linkSchema = z.object({
  name: z.string().min(1, "Обов'язкове поле"),
  link: z.string().url("Введіть валідне посилання"),
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
    object: z.string().min(1, "Обов'язкове поле"),
    aim: z.string().min(1, "Обов'язкове поле"),
    theory: z.string().min(1, "Обов'язкове поле"),
    methods: z.string().min(1, "Обов'язкове поле"),
    instruments: z.string().min(1, "Обов'язкове поле"),
  }),
  focus: z.string().min(1, "Обов'язкове поле"),
  features: z.string().min(1, "Обов'язкове поле"),
});

export const programSchema = z.object({
  name: z.string().min(1, "Обов'язкове поле"),
  degree: z.enum(["phd", "doc"]),
  accredited: z.boolean(),
  institute: instituteSchema,
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
  purpose: z.string().min(1, "Обов'язкове поле").optional(),
  years: z
    .number()
    .min(1, "Число має бути більше 0")
    .max(5, "Число не може бути більше 5")
    .optional(),
  credits: z
    .number()
    .min(1, "Число має бути більше 0")
    .max(1000, "Завелика кількість кредитів")
    .optional(),
  programCharacteristics: programCharacteristicsSchema.optional(),
  descriptions: z.string().min(2, "Обов'язкове поле").optional(), //workaround of stupid bug
  objects: z.string().min(1, "Обов'язкове поле").optional(),
  directions: z
    .array(z.string().min(1, "Обов'язкове поле"))
    .min(1, "Додайте хоча б один напрям!")
    .optional(),
  linkFaculties: z.array(linkSchema),
  // programDocumentId: z.instanceof(File),
});

export type ProgramFormValues = z.infer<typeof programSchema>;
