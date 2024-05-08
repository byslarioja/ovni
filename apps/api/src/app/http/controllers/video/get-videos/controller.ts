import { Response, Request } from "express";
import { getAllVideos } from "@app/repositories/video.repository";
import { VideoResource } from "@app/http/resources/video.resource";

export const getVideosController = async (_: Request, res: Response) => {
  try {
    const videos = await getAllVideos();

    return res.status(200).json({ videos: VideoResource.toArray(videos) });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};
