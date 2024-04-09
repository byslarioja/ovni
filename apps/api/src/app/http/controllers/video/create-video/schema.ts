import { User } from "@app/entities/User";
import {
  ClimateValue,
  GPSValue,
  OrientationValue,
  RotationValue,
} from "@app/types/sensor-readings";
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
      value: z.object({
        x: z.optional(z.number().nullable()),
        y: z.optional(z.number().nullable()),
        z: z.optional(z.number().nullable()),
      }),
      timestamp: z.number(),
    })
  ),
  climate: z.array(
    z.object({
      value: z.object({
        temperature: z.optional(z.string().nullable()),
        humidity: z.optional(z.string().nullable()),
      }),
      timestamp: z.number(),
    })
  ),
  gps: z.array(
    z.object({
      value: z.object({
        coords: z.optional(
          z.object({
            latitude: z.number().nullable().optional(),
            longitude: z.number().nullable().optional(),
          })
        ),
        speed: z.optional(z.number()),
        altitude: z.optional(z.number()),
      }),
      timestamp: z.number(),
    })
  ),
  orientation: z.array(
    z.object({
      value: z.string(),
      timestamp: z.number(),
    })
  ),
});

export const VideoSchema = z.object({
  body: z.object({
    start: z.number(),
    end: z.number(),
    appVersion: z.string(),
    hash: z.string(),
    asset: AssetSchema,
    readings: ReadingSchema,
  }),
});

//z.infer makes deep members optionals, that's why i'm repeting myself
export type VideoRequest = {
  body: {
    user: User;
    start: number;
    end: number;
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
      rotation: SensorReading<RotationValue>[];
      climate: SensorReading<ClimateValue>[];
      gps: SensorReading<GPSValue>[];
      orientation: SensorReading<OrientationValue>[];
    };
  };
};

type SensorReading<T> = {
  value: T;
  timestamp: number;
};
