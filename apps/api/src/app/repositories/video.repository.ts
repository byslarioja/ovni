import { SensorReading } from "@app/entities/SensorReadings";
import { Video } from "@app/entities/Video";
import { VideoRequest } from "@app/http/controllers/video/create-video/schema";
import { refineReadings } from "@app/http/services/readings";
import { AppDataSource } from "@config/database";

export const createVideo = async (newVideo: VideoRequest["body"]) => {
  const video = new Video();
  const videoRepository = AppDataSource.getRepository(Video);

  video.integrity_string = newVideo.hash;
  video.id_from_video = newVideo.asset.id;
  video.device_uri = newVideo.asset.uri;
  video.width = newVideo.asset.width;
  video.height = newVideo.asset.height;
  video.duration = newVideo.asset.duration;
  video.app_version = newVideo.appVersion;
  video.start_time = String(newVideo.start);
  video.end_time = String(newVideo.end);

  video.user = newVideo.user;

  const createdVideo = await videoRepository.save(video);

  await AppDataSource.createQueryBuilder()
    .insert()
    .into(SensorReading)
    .values(refineReadings(newVideo.readings, createdVideo))
    .execute();

  return createdVideo;
};
