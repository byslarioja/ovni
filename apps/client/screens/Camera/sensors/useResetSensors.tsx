import { atom } from "jotai";
import { GPSReadingsAtom } from "./useGPS";
import { climateReadingsAtom } from "./useClimate";
import { deviceRotationReadingsAtom } from "./useDeviceRotation";
import { magnetometerReadingsAtom } from "./useMagnetometer";
import { endTimeAtom, startTimeAtom } from "./useTime";

function reset<T>(prev: T[]) {
  const lastItem = prev[prev.length - 1];
  return lastItem ? [lastItem] : [];
}

export const resetSensorsAtom = atom(null, (_, set) => {
  set(GPSReadingsAtom, reset);
  set(climateReadingsAtom, reset);
  set(deviceRotationReadingsAtom, reset);
  set(magnetometerReadingsAtom, reset);
});

export const resetTimeAtom = atom(null, (_, set) => {
  set(endTimeAtom, 0);
  set(startTimeAtom, 0);
});
