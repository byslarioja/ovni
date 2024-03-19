import { z } from "zod";

export const VideoInfoSchema = z.object({
  body: z.object({
    hash: z.string().regex(/^[^-]+-[^-]+-[^-]+-[^-]+-[^-]+$/),
    asset: z.object({
      id: z.string(),
      filename: z.string(),
      uri: z.string(),
      mediaType: z.literal("video"),
      width: z.number(),
      height: z.number(),
      creationTime: z.number(),
      modificationTime: z.number(),
      duration: z.number(),
    }),
  }),
});

export type VideoInfoRequest = z.infer<typeof VideoInfoSchema>;
