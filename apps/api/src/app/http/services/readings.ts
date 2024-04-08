import { Video } from "@app/entities/Video";
import { VideoRequest } from "../controllers/video/create-video/schema";
import { Sensor } from "@app/enums/Sensor";

export const refineReadings = (
  readings: VideoRequest["body"]["readings"],
  video: Video
) => {
  const gps = readings.gps
    .map((reading) => ({
      sensor: Sensor.GPS,
      video,
      ...reading,
    }))
    .filter(
      (c) =>
        Object.keys(c.value.coords).length > 0 ||
        c.value.altitude !== undefined ||
        c.value.speed !== undefined
    );

  const climate = readings.climate
    .map((reading) => ({
      sensor: Sensor.Climate,
      video,
      ...reading,
    }))
    .filter(
      (c) =>
        typeof c.value.humidity === typeof "" ||
        typeof c.value.temperature === typeof ""
    );

  const orientation = readings.orientation
    .map((reading) => ({
      sensor: Sensor.Orientation,
      video,
      ...reading,
    }))
    .filter((c) => typeof c.value === typeof "");

  const rotation = readings.rotation
    .map((reading) => ({
      sensor: Sensor.Rotation,
      video,
      ...reading,
    }))
    .filter((c) => Object.keys(c.value).length > 0);

  console.log([...gps, ...climate, ...orientation, ...rotation]);

  return [...gps, ...climate, ...orientation, ...rotation];
};
