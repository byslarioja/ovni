import { Video } from "@app/entities/Video";
import { VideoRequest } from "../controllers/video/create-video/schema";
import { Sensor } from "@app/enums/Sensor";

export const refineReadings = (
  readings: VideoRequest["body"]["readings"],
  video: Video
) => {
  const gps = readings.gps.map((reading) => ({
    sensor: Sensor.GPS,
    video,
    ...reading,
  }));

  const climate = readings.climate.map((reading) => ({
    sensor: Sensor.Climate,
    video,
    ...reading,
  }));

  const orientation = readings.orientation.map((reading) => ({
    sensor: Sensor.Orientation,
    video,
    ...reading,
  }));

  const rotation = readings.rotation.map((reading) => ({
    sensor: Sensor.Rotation,
    video,
    ...reading,
  }));

  return [...gps, ...climate, ...orientation, ...rotation];
};
