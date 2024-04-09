import {
  ClimateReadings,
  GPSReading,
  MagnetometerReading,
  RotationReading,
  SensorReading,
} from "../sensors/types";

export const refineGPS = (reading: GPSReading) =>
  Object.keys(reading.value.coords).length > 0 ||
  reading.value.altitude !== undefined ||
  reading.value.speed !== undefined;

export const refineClimate = (reading: ClimateReadings) =>
  typeof reading.value.humidity === typeof "" ||
  typeof reading.value.temperature === typeof "";

export const refineOrientation = (reading: MagnetometerReading) =>
  typeof reading.value === typeof "";

export const refineRotation = (reading: RotationReading) =>
  Object.keys(reading.value).length > 0;

export const readingsWithinVideoLength = (
  reading: SensorReading<any>,
  start: number,
  end: number
) => {
  return reading.timestamp >= start && reading.timestamp <= end;
};
