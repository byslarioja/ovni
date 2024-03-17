import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

export type LoginUserRequest = z.infer<typeof ForgotPasswordSchema>;
