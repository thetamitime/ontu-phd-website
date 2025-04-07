import { z } from "zod";

export const programSchema = z.object({
  name: z.string().min(1, "Назва обовʼязкова"),
  degree: z.enum(["phd", "doc"]),
  accredited: z.boolean(),
  // fieldOfStudy: z.object({
  //   code: z.string().min(1),
  //   name: z.string().min(1),
  // }),
  // speciality: z.object({
  //   code: z.string().min(1),
  //   name: z.string().min(1),
  //   fieldCode: z.string().min(1),
  // }),
  form: z.array(z.string()),
  purpose: z.string().optional(),
  years: z.number().optional(),
  credits: z.number().optional(),
  programCharacteristics: z
    .object({
      area: z.object({
        object: z.string(),
        aim: z.string(),
        theory: z.string(),
        methods: z.string(),
        instruments: z.string(),
      }),
      focus: z.string(),
      features: z.array(z.string()),
    })
    .optional(),
  description: z.string().optional(),
  objects: z.string().optional(),
  directions: z.array(z.string()).optional(),
  linkFaculty: z.string().url("Введіть валідну URL"),
  linkFile: z.string().optional(),
});

export type ProgramFormValues = z.infer<typeof programSchema>;
