import { atom } from "jotai";
import {
  ClimateReadings,
  GPSReading,
  MagnetometerReading,
  RotationReading,
  SensorReading,
} from "./types";
import { deviceRotationReadingsAtom } from "./useDeviceRotation";
import { climateReadingsAtom } from "./useClimate";
import { GPSReadingsAtom } from "./useGPS";
import { magnetometerReadingsAtom } from "./useMagnetometer";
import { endTimeAtom, startTimeAtom } from "./useElapsedTime";

export const readingsAtom = atom((get) => {
  const startTime = get(startTimeAtom);
  const endTime = get(endTimeAtom);

  const rotation = get(deviceRotationReadingsAtom);
  const climate = get(climateReadingsAtom);
  const gps = get(GPSReadingsAtom);
  const orientation = get(magnetometerReadingsAtom);

  return {
    rotation: rotation
      .filter(refineRotation)
      .filter(readingsWithinVideoLength(startTime, endTime)),
    climate: climate
      .filter(refineClimate)
      .filter(readingsWithinVideoLength(startTime, endTime)),
    gps: gps
      .filter(refineGPS)
      .filter(readingsWithinVideoLength(startTime, endTime)),
    orientation: orientation
      .filter(refineOrientation)
      .filter(readingsWithinVideoLength(startTime, endTime)),
  };
});

const refineGPS = (reading: GPSReading) =>
  reading &&
  (reading.value?.coords ||
    reading.value?.coords.latitude ||
    reading.value?.coords.longitude ||
    !reading.value?.altitude ||
    !reading.value?.speed);

const refineClimate = (reading: ClimateReadings) =>
  reading &&
  (typeof reading.value.humidity === typeof "" ||
    typeof reading.value.temperature === typeof "");

const refineOrientation = (reading: MagnetometerReading) =>
  reading && reading.value;

const refineRotation = (reading: RotationReading) =>
  reading && (reading.value.x || reading.value.y || reading.value.z);

const readingsWithinVideoLength = (start: number, end: number) => {
  return (
    reading: SensorReading<any>,
    index: number,
    readings: SensorReading<any>[]
  ) =>
    index !== readings.length - 1 ||
    (reading.timestamp >= start && reading.timestamp <= end);
};
