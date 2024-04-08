import { z } from "zod";

const AssetSchema = z.object({
  id: z.string(),
  filename: z.string(),
  uri: z.string(),
  mediaType: z.literal("video"),
  width: z.number(),
  height: z.number(),
  creationTime: z.number(),
  modificationTime: z.number(),
  duration: z.number(),
});

const ReadingSchema = z.object({
  rotation: z.array(
    z.object({
      x: z.string(),
      y: z.string(),
      z: z.string(),
    })
  ),
  climate: z.array(
    z.object({
      temperature: z.string(),
      humidity: z.string(),
    })
  ),
  gps: z.array(
    z.object({
      coords: z.object({
        latitude: z.string(),
        longitude: z.string(),
      }),
      speed: z.string(),
      altitude: z.string(),
    })
  ),
  orientation: z.array(z.string()),
});

export const VideoSchema = z.object({
  body: z.object({
    start: z.string(),
    end: z.string(),
    appVersion: z.string(),
    hash: z.string(),
    asset: AssetSchema,
    reading: ReadingSchema,
  }),
});

//z.infer makes deep members optionals, that's why i'm repeting myself
export type VideoRequest = {
  body: {
    token: { id: string; email: string };
    start: string;
    end: string;
    appVersion: string;
    hash: string;
    asset: {
      id: string;
      filename: string;
      uri: string;
      mediaType: "video";
      width: number;
      height: number;
      creationTime: number;
      modificationTime: number;
      duration: number;
    };
    readings: {
      rotation: SensorReading<{ x: number; y: number; z: number }>[];
      climate: SensorReading<{
        temperature: string;
        humidity: string;
      }>[];
      gps: SensorReading<{
        coords: {
          latitude: number;
          longitude: number;
        };
        speed: number;
        altitude: number;
      }>[];
      orientation: SensorReading<string>[];
    };
  };
};

type SensorReading<T> = {
  value: T;
  timestamp: number;
};
