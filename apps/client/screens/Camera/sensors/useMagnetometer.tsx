import { useEffect } from "react";
import { Magnetometer, MagnetometerMeasurement } from "expo-sensors";
import { PrimitiveAtom, atom, useAtom } from "jotai";

const MAGNETOMETER_UPDATE_INTERVAL = Number(
  process.env.EXPO_PUBLIC_MAGNETOMETER_INTERVAL
);

//TODO: fix this chanchada
export const magnetometerAtom = atom<string | null>(null) as PrimitiveAtom<
  string | null
>;

//This logic should be whitin magnetometerAtom
export default function useMagnetometer() {
  const [, setMagnetometer] = useAtom(magnetometerAtom);

  useEffect(() => {
    Magnetometer.setUpdateInterval(MAGNETOMETER_UPDATE_INTERVAL);

    const subscription = Magnetometer.addListener((data) => {
      setMagnetometer(degToDMS(_angle(data)));
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
}
