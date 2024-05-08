import e, { Response } from "express";
import { videoWasModified } from "@app/repositories/video.repository";
import { VideoUriRequest } from "./schema";

export const checkIntegrityController = async (
  req: VideoUriRequest,
  res: Response
) => {
  const { hash } = req.params;

  try {
    const wasModified = await videoWasModified(hash);

    if (wasModified) return res.status(422).send();

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
};
