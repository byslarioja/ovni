import { z } from "zod";

export const AssetSchema = z.object({
  id: z.string(),
  filename: z.string(),
  uri: z.string(),
  mediaType: z.literal("video"),
  width: z.number(),
  height: z.number(),
  creationTime: z.number(),
  modificationTime: z.number(),
  duration: z.number(),
});

export const VideoInfoSchema = z.object({
  body: z.object({
    hash: z.string(),
    asset: AssetSchema,
  }),
});

//z.infer makes deep members optionals, that's why i'm repeting myself
export type VideoInfoRequest = {
  body: {
    hash: string;
    asset: {
      id: string;
      filename: string;
      uri: string;
      mediaType: "video";
      width: number;
      height: number;
      creationTime: number;
      modificationTime: number;
      duration: number;
    };
  };
};
export type Asset = z.infer<typeof AssetSchema>;
