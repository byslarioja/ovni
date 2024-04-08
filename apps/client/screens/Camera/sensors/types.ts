import { PrimitiveAtom } from "jotai";

export type SensorReading<T> = {
  value: T;
  timestamp: number;
};

export type ClimateResponse = {
  current: {
    temperature_2m: string;
    relative_humidity_2m: string;
  };
  current_units: {
    temperature_2m: string;
    relative_humidity_2m: string;
  };
};

export type ClimateReadings = SensorReading<{
  temperature: string;
  humidity: string;
}>;

export type TimeAtomValue = number | null;
export type PrimitiveTimeAtom = PrimitiveAtom<TimeAtomValue>;

export type RotationType = { x: number; y: number; z: number };
export type RotationReading = SensorReading<RotationType>;

export type GPSReading = SensorReading<{
  coords: {
    latitude: number;
    longitude: number;
  };
  speed: number;
  altitude: number;
}>;
