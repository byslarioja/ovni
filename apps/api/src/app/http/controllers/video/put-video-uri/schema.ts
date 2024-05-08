import { z } from "zod";

export const VideoUriSchema = z.object({
  body: z.object({
    uri: z.string(),
    hash: z.string(),
  }),
});

//z.infer makes deep members optionals, that's why i'm repeting myself
export type VideoUriRequest = z.infer<typeof VideoUriSchema>;
