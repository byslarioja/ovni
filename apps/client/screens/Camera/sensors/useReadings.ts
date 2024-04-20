import { atom } from "jotai";
import {
  ClimateReadings,
  GPSReading,
  MagnetometerReading,
  RotationReading,
} from "./types";
import { deviceRotationReadingsAtom } from "./useDeviceRotation";
import { climateReadingsAtom } from "./useClimate";
import { GPSReadingsAtom } from "./useGPS";
import { magnetometerReadingsAtom } from "./useMagnetometer";

export const readingsAtom = atom((get) => {
  const rotation = get(deviceRotationReadingsAtom);
  const climate = get(climateReadingsAtom);
  const gps = get(GPSReadingsAtom);
  const orientation = get(magnetometerReadingsAtom);

  return {
    rotation: rotation && rotation.filter(refineRotation),
    climate: climate && climate.filter(refineClimate),
    gps: gps && gps.filter(refineGPS),
    orientation: orientation && orientation.filter(refineOrientation),
  };
});

const refineGPS = (reading: GPSReading) =>
  reading &&
  reading.value?.coords &&
  typeof reading.value?.coords.latitude === "number" &&
  typeof reading.value?.coords.longitude === "number" &&
  (typeof reading.value?.altitude === "number" ||
    reading.value?.altitude === undefined) &&
  (typeof reading.value?.speed === "number" ||
    reading.value?.speed === undefined);

const refineClimate = (reading: ClimateReadings) =>
  reading &&
  typeof reading.value.humidity === "string" &&
  typeof reading.value.temperature === "string";

const refineOrientation = (reading: MagnetometerReading) =>
  reading &&
  typeof reading.value.x === "number" &&
  typeof reading.value.y === "number" &&
  typeof reading.value.z === "number";

const refineRotation = (reading: RotationReading) =>
  reading &&
  typeof reading.value.x === "number" &&
  typeof reading.value.y === "number" &&
  typeof reading.value.z === "number";
