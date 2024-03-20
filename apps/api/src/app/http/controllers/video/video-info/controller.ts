import { Response } from "express";
import { VideoInfoRequest } from "./schema";
import "dotenv/config";
import { createVideoInfo } from "@app/repositories/video.repository";

export const videoInfoController = async (
  req: VideoInfoRequest,
  res: Response
) => {
  const validated = req.body;

  try {
    const videoInfo = await createVideoInfo(validated);

    return res.status(201).json(videoInfo);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};
