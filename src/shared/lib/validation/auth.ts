import { z } from "zod";

export const AuthSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
});

export type AuthFormValues = z.infer<typeof AuthSchema>;