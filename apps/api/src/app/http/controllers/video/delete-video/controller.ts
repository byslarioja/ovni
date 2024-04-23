import { Response } from "express";
import { DeleteVideoRequest } from "./schema";
import { deleteVideo, findById } from "@app/repositories/video.repository";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "@config/firebase";

export const deleteVideoController = async (
  req: DeleteVideoRequest,
  res: Response
) => {
  try {
    const { videoId } = req.params;

    if (!videoId)
      return res.status(422).send({ message: "Param videoId not provided" });

    const video = await findById(videoId);

    if (!video) return res.status(404).send({ message: "No video was found" });

    // Create a reference to the file to delete
    const videoRef = ref(storage, video.getFirebaseFilename());

    // Delete the file
    await deleteObject(videoRef);
    await deleteVideo(videoId);

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};
