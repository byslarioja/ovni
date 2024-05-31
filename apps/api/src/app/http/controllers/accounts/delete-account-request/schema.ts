import { z } from "zod";

export const deleteAccountSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

export type DeleteAccountRequest = z.infer<typeof deleteAccountSchema>;
