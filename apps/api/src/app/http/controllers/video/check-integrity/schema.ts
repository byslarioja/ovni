import { z } from "zod";

const VideoUriSchema = z.object({
  params: z.object({
    hash: z.string(),
  }),
});

export type VideoUriRequest = z.infer<typeof VideoUriSchema>;
