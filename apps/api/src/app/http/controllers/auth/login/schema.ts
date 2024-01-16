import { z } from "zod";

export const LoginUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export type LoginUserRequest = z.infer<typeof LoginUserSchema>;
