import { Response } from "express";
import { VideoRequest } from "./schema";
import { createVideo } from "@app/repositories/video.repository";
import { VideoResource } from "@app/http/resources/video.resource";

export const videoController = async (req: VideoRequest, res: Response) => {
  const validated = req.body;

  try {
    const video = await createVideo(validated);

    return res.status(201).json(VideoResource.toJson(video));
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};
