import { z } from "zod";

const ShowUserSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

export type ShowUserRequest = z.infer<typeof ShowUserSchema>;
