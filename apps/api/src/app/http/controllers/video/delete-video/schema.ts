import { z } from "zod";

const DeleteVideoSchema = z.object({
  params: z.object({
    videoId: z.string(),
  }),
});

export type DeleteVideoRequest = z.infer<typeof DeleteVideoSchema>;
