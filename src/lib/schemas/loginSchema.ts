import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Такої пошти не існує"),
  password: z
    .string()
    // .min(8, "Пароль має містити більше 8 символів")
    .max(128, "Пароль не може бути довше 128 символів"),
  // .regex(/[A-Z]/, "Пароль має містити хоча б одну велику літеру")
  // .regex(/[a-z]/, "Пароль має містити хоча б одну маленьку літеру")
  // .regex(/[0-9]/, "Пароль має містити хоча б одну цифру")
  // .regex(/[\W_]/, "Пароль має містити хоча б один спеціальний знак"),
});

export type Credentials = z.infer<typeof loginSchema>;
