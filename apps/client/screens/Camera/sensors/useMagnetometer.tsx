import { useEffect } from "react";
import { Magnetometer } from "expo-sensors";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { MagnetometerReading } from "./types";
import { SpaceType } from "globals/sensor.primitives";

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

const RAD = 180 / Math.PI;

export const degToDMS = (deg: number, dplaces = 0) => {
  var d = Math.floor(deg);
  var m = Math.floor((deg - d) * 60);
  var s =
    Math.round(((deg - d) * 60 - m) * 60 * Math.pow(10, dplaces)) /
    Math.pow(10, dplaces);
  s == 60 && (m++, (s = 0));
  m == 60 && (d++, (m = 0));

  return d + "° " + m + "' " + s + '"';
};

export const spaceToAngle = (space: SpaceType) => {
  let angle = 0;
  if (space) {
    let { x, y, z } = space;
    if (Math.atan2(y, x) >= 0) {
      angle = Math.atan2(y, x) * RAD;
    } else {
      angle = (Math.atan2(y, x) + 2 * Math.PI) * RAD;
    }
  }

  return angle;
};
