import { Video } from "@app/entities/Video";
import { SerializableUser, UserResource } from "./user.resource";
import {
  SensorReadingResource,
  SerializableSensorReading,
} from "./reading.resource";

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
      uri: video.uri,
      user: UserResource.toJson(video.user),
      readings: SensorReadingResource.toArray(video.readings),
      created_at: video.created_at,
      updated_at: video.updated_at,
    };
  }

  public static toArray(videos: Video[]): Array<SerializableVideo> {
    return videos.map(this.toJson);
  }
}

type SerializableVideo = Omit<
  Video,
  | "deleted_at"
  | "device_uri"
  | "id_from_video"
  | "integrity_string"
  | "user"
  | "readings"
> & { user: SerializableUser } & { readings: SerializableSensorReading[] };
