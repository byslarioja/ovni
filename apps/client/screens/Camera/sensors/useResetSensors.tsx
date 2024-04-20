import { atom } from "jotai";
import { GPSReadingsAtom } from "./useGPS";
import { climateReadingsAtom } from "./useClimate";
import { deviceRotationReadingsAtom } from "./useDeviceRotation";
import { magnetometerReadingsAtom } from "./useMagnetometer";
import { endTimeAtom, startTimeAtom } from "./useTime";

export const resetSensorsAtom = atom(null, (_, set) => {
  set(GPSReadingsAtom, (prev) => (prev ? [prev.at(-1)] : []));
  set(climateReadingsAtom, (prev) => (prev ? [prev.at(-1)] : []));
  set(deviceRotationReadingsAtom, (prev) => (prev ? [prev.at(-1)] : []));
  set(magnetometerReadingsAtom, (prev) => (prev ? [prev.at(-1)] : []));
});

export const resetTimeAtom = atom(null, (_, set) => {
  set(endTimeAtom, 0);
  set(startTimeAtom, 0);
});
