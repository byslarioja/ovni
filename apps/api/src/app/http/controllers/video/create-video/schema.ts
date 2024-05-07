import { User } from "@app/entities/User";
import {
  ClimateValue,
  GPSValue,
  OrientationValue,
  RotationValue,
} from "@app/types/sensor-readings";
import { SensorReadingPrimitive } from "src/globals/sensor.primitives";
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

const SpaceSchema = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
});

const ReadingSchema = z.object({
  rotation: z.array(
    z.object({
      value: SpaceSchema,
      timestamp: z.number(),
    })
  ),
  climate: z.array(
    z.object({
      value: z.object({
        temperature: z.string(),
        humidity: z.string(),
      }),
      timestamp: z.number(),
    })
  ),
  gps: z.array(
    z.object({
      value: z.object({
        coords: z.object({
          latitude: z.number().optional(),
          longitude: z.number().optional(),
        }),
        speed: z.optional(z.number()),
        altitude: z.optional(z.number()),
      }),
      timestamp: z.number(),
    })
  ),
  orientation: z.array(
    z.object({
      value: SpaceSchema,
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
  file?: {
    path: string;
  };
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
      rotation: SensorReadingPrimitive<RotationValue>[];
      climate: SensorReadingPrimitive<ClimateValue>[];
      gps: SensorReadingPrimitive<GPSValue>[];
      orientation: SensorReadingPrimitive<OrientationValue>[];
    };
  };
};
