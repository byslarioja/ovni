import { useEffect, useState } from "react";
import { Accelerometer } from "expo-sensors";

const GYRO_UPDATE_INTERVAL = Number(process.env.EXPO_PUBLIC_GYRO_INTERVAL);

export default function useGyro() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  Accelerometer.setUpdateInterval(GYRO_UPDATE_INTERVAL);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData);
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

  return {
    x: Math.atan2(x, Math.sqrt(y * y + z * z)) * (180 / Math.PI),
    y: Math.atan2(y, Math.sqrt(x * x + z * z)) * (180 / Math.PI),
    z: Math.atan2(z, Math.sqrt(x * x + y * y)) * (180 / Math.PI),
  };
}
