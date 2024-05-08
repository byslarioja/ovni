import { Response } from "express";
import { addVideoUri } from "@app/repositories/video.repository";
import { VideoUriRequest } from "./schema";

export const putVideoUriController = async (
  req: VideoUriRequest,
  res: Response
) => {
  const { uri, hash } = req.body;

  try {
    await addVideoUri(uri, hash);

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};
