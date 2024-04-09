import { Asset } from "expo-media-library";
import {
  ClimateReadings,
  GPSReading,
  MagnetometerReading,
  RotationReading,
  TimeReading,
} from "../sensors/types";

/**
 * Response types
 */
export interface ApiVideoSavedResponse {
  data: {
    id: string;
    width: number;
    height: number;
    duration: number;
    app_version: number;
    start_time: string;
    end_time: string;
    uri: string | null;
    created_at: string;
    updated_at: string;
  };
}

interface VideoValidationError {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
}

export interface ApiErrorResponse {
  response: {
    data: { issues: VideoValidationError[] };
  };
}

/**
 * Request types
 */
export interface VideoPayload {
  hash: string;
  start: TimeReading;
  end: TimeReading;
  appVersion: string;
  asset: Asset;
  readings: Readings;
  token: string;
}

type Readings = {
  rotation: RotationReading[];
  climate: ClimateReadings[];
  gps: GPSReading[];
  orientation: MagnetometerReading[];
};
