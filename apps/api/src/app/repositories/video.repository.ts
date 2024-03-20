import { VideoInfo } from "@app/entities/VideoInfo";
import { VideoInfoRequest } from "@app/http/controllers/video/video-info/schema";
import { AppDataSource } from "@config/database";

export const createVideoInfo = async (
  newVideoInfo: VideoInfoRequest["body"]
) => {
  const videoInfo = new VideoInfo();
  const videoInfoRepository = AppDataSource.getRepository(VideoInfo);

  videoInfo.hash = newVideoInfo.hash;
  videoInfo.id_from_video = newVideoInfo.asset.id;
  videoInfo.device_uri = newVideoInfo.asset.uri;
  videoInfo.width = newVideoInfo.asset.width;
  videoInfo.height = newVideoInfo.asset.height;
  videoInfo.duration = newVideoInfo.asset.duration;

  const craetedVideoInfo = await videoInfoRepository.save(videoInfo);

  return craetedVideoInfo;
};
