import {
  ClimatePrimitive,
  GPSPrimitive,
  OrientationPrimitive,
  RotationPrimitive,
  SensorReadingPrimitive,
} from "globals/sensor.primitives";
import { PrimitiveAtom } from "jotai";

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

export type ClimateReadings = SensorReadingPrimitive<ClimatePrimitive>;

export type TimeReading = number | null;
export type PrimitiveTimeAtom = PrimitiveAtom<TimeReading>;

export type RotationReading = SensorReadingPrimitive<RotationPrimitive>;

export type GPSReading = SensorReadingPrimitive<GPSPrimitive>;

export type MagnetometerReading = SensorReadingPrimitive<OrientationPrimitive>;
