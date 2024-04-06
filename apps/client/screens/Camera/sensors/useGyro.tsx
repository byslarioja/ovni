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

  return {
    x:
      (Math.atan2(x, Math.sqrt(y * y + z * z)) * (180 / Math.PI)).toFixed(2) +
      "°",
    y:
      (Math.atan2(y, Math.sqrt(x * x + z * z)) * (180 / Math.PI)).toFixed(2) +
      "°",
    z:
      (Math.atan2(z, Math.sqrt(x * x + y * y)) * (180 / Math.PI)).toFixed(2) +
      "°",
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
