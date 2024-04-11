import { useEffect } from "react";
import { Magnetometer } from "expo-sensors";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { MagnetometerReading } from "./types";
import { degToDMS, spaceToAngle } from "utils";

const MAGNETOMETER_UPDATE_INTERVAL = Number(
  process.env.EXPO_PUBLIC_MAGNETOMETER_INTERVAL
);

export const magnetometerReadingsAtom = atom<MagnetometerReading[]>([]);

export const lastAvailableAngleAtom = atom((get) => {
  const readings = get(magnetometerReadingsAtom);
  const lastReading = readings.at(-1);

  if (!lastReading) return null;

  const angle = spaceToAngle(lastReading.value);
  return degToDMS(angle);
});

//This logic should be whitin magnetometerAtom
export default function useMagnetometer() {
  const setMagnetometerReading = useSetAtom(magnetometerReadingsAtom);
  const lastAvailableAngle = useAtomValue(lastAvailableAngleAtom);

  useEffect(() => {
    Magnetometer.setUpdateInterval(MAGNETOMETER_UPDATE_INTERVAL);

    const subscription = Magnetometer.addListener((data) => {
      setMagnetometerReading((prev) => [
        ...prev,
        { value: data, timestamp: Date.now() },
      ]);
    });

    return () => {
      subscription && subscription.remove();
    };
  }, []);

  return { angle: lastAvailableAngle };
}
