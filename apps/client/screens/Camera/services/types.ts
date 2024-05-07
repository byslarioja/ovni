import { Asset } from "expo-media-library";
import {
  ClimateReadings,
  GPSReading,
  MagnetometerReading,
  RotationReading,
} from "../sensors/types";

/**
 * Response types
 */
export type ApiVideoSavedResponse = {
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
};

type VideoValidationError = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};

export type ApiErrorResponse = {
  response: {
    data: { issues: VideoValidationError[] };
  };
};

/**
 * Request types
 */
export type AssetPayload = {
  payload: {
    hash: string;
    start: number;
    end: number;
    appVersion: string;
    asset: Asset;
    readings: Readings;
  };
  token: string;
};

export type URIPayload = {
  hash: string;
  uri: string;
  token: string;
};

export type IntegrityPayload = {
  hash: string;
  token: string;
};

export type PersistedAsset = Asset & {
  status: AssetStatus;
};

export enum AssetStatus {
  Uploaded,
  Rejected,
  Pending,
}

type Readings = {
  rotation: RotationReading[];
  climate: ClimateReadings[];
  gps: GPSReading[];
  orientation: MagnetometerReading[];
};
