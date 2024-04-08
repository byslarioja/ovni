import { User } from "@app/entities/User";
import { Video } from "@app/entities/Video";
import { VideoRequest } from "@app/http/controllers/video/create-video/schema";
import { AppDataSource } from "@config/database";

export const createVideo = async (newVideo: VideoRequest["body"]) => {
  const video = new Video();
  const videoRepository = AppDataSource.getRepository(Video);
  const userRepository = AppDataSource.getRepository(User);

  video.integrity_string = newVideo.hash;
  video.id_from_video = newVideo.asset.id;
  video.device_uri = newVideo.asset.uri;
  video.width = newVideo.asset.width;
  video.height = newVideo.asset.height;
  video.duration = newVideo.asset.duration;
  video.start_time = newVideo.start;
  video.end_time = newVideo.end;

  video.user = await userRepository.findOne({
    where: { id: newVideo.token.id },
  });

  const createdVideo = await videoRepository.save(video);

  return createdVideo;
};
