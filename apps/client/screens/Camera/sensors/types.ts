import {
  ClimatePrimitive,
  GPSPrimitive,
  OrientationPrimitive,
  RotationPrimitive,
  SensorReadingPrimitive,
} from "globals/sensor.primitives";

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

export type RotationReading = SensorReadingPrimitive<RotationPrimitive>;

export type GPSReading = SensorReadingPrimitive<GPSPrimitive>;

export type MagnetometerReading = SensorReadingPrimitive<OrientationPrimitive>;
