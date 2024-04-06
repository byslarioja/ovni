import { useEffect, useState } from "react";
import { Accelerometer } from "expo-sensors";
import { atom, useAtom } from "jotai";

const GYRO_UPDATE_INTERVAL = Number(process.env.EXPO_PUBLIC_GYRO_INTERVAL);

const accelerometerAtom = atom({
  x: 0,
  y: 0,
  z: 0,
});

export const gyroAtom = atom((get) => {
  const { x, y, z } = get(accelerometerAtom);

  const format = (h: number, c1: number, c2: number) => {
    const RAD = 180 / Math.PI;
    return Math.atan2(h, Math.sqrt(c1 * c1 + c2 * c2)) * RAD;
  };

  return {
    x: format(x, y, z).toFixed(2) + "°",
    y: format(y, x, z).toFixed(2) + "°",
    z: format(z, x, y).toFixed(2) + "°",
  };
});

export default function useGyro() {
  const [, setAccelerometer] = useAtom(accelerometerAtom);
  const [subscription, setSubscription] = useState(null);

  Accelerometer.setUpdateInterval(GYRO_UPDATE_INTERVAL);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setAccelerometer(accelerometerData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);
}
