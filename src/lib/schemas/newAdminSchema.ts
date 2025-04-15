import { z } from "zod";

export const adminSchema = z.object({
  email: z.string().email("Введіть існуючу пошту"),
  name: z
    .string()
    .min(1, "Введіть ім'я користувача")
    .regex(/^[\p{L}\s'-]+$/u, "Заборонено використовувати спеціальні символи!"),
});

export const newAdminSchema = z.object({
  admins: z.array(adminSchema).nullish(),
});

export type NewAdminValues = z.infer<typeof newAdminSchema>;
export type adminValue = z.infer<typeof adminSchema>;
