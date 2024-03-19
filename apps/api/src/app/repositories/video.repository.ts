import { VideoInfo } from "@app/entities/VideoInfo";
import { AppDataSource } from "@config/database";

export const createVideoInfo = async (newVideoInfo) => {
  const videoInfo = new VideoInfo();
  const videoInfoRepository = AppDataSource.getRepository(VideoInfo);

  videoInfo.hash = newVideoInfo.hash;
  videoInfo.id_from_video = newVideoInfo.id_from_video;
  videoInfo.device_uri = newVideoInfo.device_uri;
  videoInfo.width = newVideoInfo.width;
  videoInfo.height = newVideoInfo.height;
  videoInfo.duration = newVideoInfo.duration;

  const craetedVideoInfo = await videoInfoRepository.save(videoInfo);

  return craetedVideoInfo;
};
