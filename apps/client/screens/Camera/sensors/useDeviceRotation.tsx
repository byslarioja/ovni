import { useEffect, useState } from "react";
import { Accelerometer } from "expo-sensors";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { RotationReading } from "./types";
import { calculateDeviceRotation } from "utils/angles";

const GYRO_UPDATE_INTERVAL = Number(process.env.EXPO_PUBLIC_GYRO_INTERVAL);

export const deviceRotationReadingsAtom = atom<RotationReading[]>([]);

export const lastAvailableRotationReading = atom((get) => {
  const rotation = get(deviceRotationReadingsAtom).at(-1)?.value;

  if (!rotation) return { x: "N/A", y: "N/A", z: "N/A" };

  return {
    x: calculateDeviceRotation(rotation.x, rotation.y, rotation.z),
    y: calculateDeviceRotation(rotation.y, rotation.x, rotation.z),
    z: calculateDeviceRotation(rotation.z, rotation.x, rotation.y),
  };
});

export default function useDeviceRotation() {
  const setDeviceRotation = useSetAtom(deviceRotationReadingsAtom);
  const deviceRotation = useAtomValue(lastAvailableRotationReading);

  const [subscription, setSubscription] = useState(null);

  Accelerometer.setUpdateInterval(GYRO_UPDATE_INTERVAL);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setDeviceRotation((prev) => [
          ...prev,
          { value: accelerometerData, timestamp: Date.now() },
        ]);
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

  return { ...deviceRotation };
}
