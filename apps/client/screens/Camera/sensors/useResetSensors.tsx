import { atom } from "jotai";
import { GPSReadingsAtom } from "./useGPS";
import { climateReadingsAtom } from "./useClimate";
import { deviceRotationReadingsAtom } from "./useDeviceRotation";
import { magnetometerReadingsAtom } from "./useMagnetometer";

export const resetSensorsAtom = atom(null, (_, set) => {
  set(GPSReadingsAtom, (prev) => [prev.at(-1)]);
  set(climateReadingsAtom, (prev) => [prev.at(-1)]);
  set(deviceRotationReadingsAtom, (prev) => [prev.at(-1)]);
  set(magnetometerReadingsAtom, (prev) => [prev.at(-1)]);
});
