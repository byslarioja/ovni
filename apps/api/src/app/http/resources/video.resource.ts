import { Video } from "@app/entities/Video";

export class VideoResource {
  public static toJson(video: Video): SerializableVideo {
    return {
      id: video.id,
      width: video.width,
      height: video.height,
      duration: video.duration,
      app_version: video.app_version,
      start_time: video.start_time,
      end_time: video.end_time,
      readings: video.readings,
      uri: video.uri,
      created_at: video.created_at,
      updated_at: video.updated_at,
    };
  }
}

type SerializableVideo = Omit<
  Video,
  "deleted_at" | "device_uri" | "id_from_video" | "integrity_string" | "user"
>;
