import { z } from "zod";

const fieldOfStudySchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
});

const specialitySchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
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
  purpose: z.string().min(1, "Введіть мету програми!").nullish(),
  years: z
    .number()
    .min(1, "Такого не може бути!")
    .max(5, "Такого не може бути!")
    .optional(),
  credits: z
    .number()
    .min(1, "Такого не може бути!")
    .max(500, "Такого не може бути!")
    .nullish(),
  // programCharacteristics: z
  //   .object({
  //     area: z.object({
  //       object: z.string(),
  //       aim: z.string(),
  //       theory: z.string(),
  //       methods: z.string(),
  //       instruments: z.string(),
  //     }),
  //     focus: z.string(),
  //     features: z.string(),
  //   })
  //   .optional(),
  // description: z.string().optional(),
  // objects: z.string().optional(),
  // directions: z.array(z.string()).optional(),
  linkFaculty: z.string().url("Введіть валідну URL"),
  // linkFile: z.string().optional(),
});

export type ProgramFormValues = z.infer<typeof programSchema>;
