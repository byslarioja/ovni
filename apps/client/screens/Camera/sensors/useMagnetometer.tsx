import { useEffect } from "react";
import { Magnetometer, MagnetometerMeasurement } from "expo-sensors";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { SensorReading } from "./types";

const MAGNETOMETER_UPDATE_INTERVAL = Number(
  process.env.EXPO_PUBLIC_MAGNETOMETER_INTERVAL
);

export const lastAvailableAngleAtom = atom((get) => {
  const readings = get(magnetometerReadingsAtom);

  return readings.at(-1)?.value;
});

export const magnetometerReadingsAtom = atom<SensorReading<string>[]>([]);

//This logic should be whitin magnetometerAtom
export default function useMagnetometer() {
  const setMagnetometerReading = useSetAtom(magnetometerReadingsAtom);
  const lastAvailableAngle = useAtomValue(lastAvailableAngleAtom);

  useEffect(() => {
    Magnetometer.setUpdateInterval(MAGNETOMETER_UPDATE_INTERVAL);

    const subscription = Magnetometer.addListener((data) => {
      setMagnetometerReading((prev) => [
        ...prev,
        { value: degToDMS(_angle(data)), timestamp: Date.now() },
      ]);
    });

    return () => {
      subscription && subscription.remove();
    };
  }, []);

  const _angle = (magnetometer: MagnetometerMeasurement) => {
    let angle = 0;
    if (magnetometer) {
      let { x, y, z } = magnetometer;
      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      } else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }
    return angle;
  };

  const degToDMS = (deg: number, dplaces = 0) => {
    var d = Math.floor(deg);
    var m = Math.floor((deg - d) * 60);
    var s =
      Math.round(((deg - d) * 60 - m) * 60 * Math.pow(10, dplaces)) /
      Math.pow(10, dplaces);
    s == 60 && (m++, (s = 0));
    m == 60 && (d++, (m = 0));
    return d + "° " + m + "' " + s + '"';
  };

  return { angle: lastAvailableAngle };
}
