import { z } from "zod";

const fieldOfStudySchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
});

const shortProgramSchema = z.object({
  id: z.number({ message: "Обов'язкове поле" }),
  name: z.string(),
  fieldOfStudy: fieldOfStudySchema,
  speciality: fieldOfStudySchema,
});

const memberSchema = z.object({
  nameSurname: z.string().min(1, "Обов'язкове поле"),
  title: z.string().min(1, "Обов'язкове поле"),
  toolTip: z.string().min(1, "Обов'язкове поле"),
});

const membersGroupSchema = z.object({
  position: z.string(),
  members: z.array(memberSchema),
});

export const defenceSchema = z.object({
  defenseTitle: z.string().min(1, "Обов'язкове поле"),
  candidateDegree: z.enum(["phd", "doc"]),
  candidateNameSurname: z.string().min(1, "Обов'язкове поле"),
  program: shortProgramSchema.optional(), //optional for deleting field before parsing to api
  defenseDate: z.string().min(1, "Обов'язкове поле"),
  publicationDate: z.string().min(1, "Обов'язкове поле"),
  address: z.string().min(1, "Обов'язкове поле"),
  scienceTeachers: z
    .array(z.string().min(1, "Обов'язкове поле"))
    .min(1, "Введіть хоча б одного керівника")
    .optional(),
  members: z.array(membersGroupSchema).optional(),
  placeholder: z.string().min(1, "Обов'язкове поле").optional(),
  message: z.string(),
});

export type DefenceFormValues = z.infer<typeof defenceSchema>;
