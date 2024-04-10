import { z } from "zod";

const BanUserSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

export type BanUserRequest = z.infer<typeof BanUserSchema>;
