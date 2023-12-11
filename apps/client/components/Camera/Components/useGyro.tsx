import { useEffect, useState } from "react";
import { DeviceMotion } from "expo-sensors";

export default function useGyro() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [subscription, setSubscription] = useState(null);

  useEffect(() => DeviceMotion.setUpdateInterval(1000));

  const _subscribe = () => {
    setSubscription(
      DeviceMotion.addListener((a) => {
        setData({
          z: (a.rotation.alpha / Math.PI) * 360,
          x: (a.rotation.beta / Math.PI) * 360,
          y: (a.rotation.gamma / Math.PI) * 360,
        });
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
    x: Math.floor(x) + "°",
    y: Math.floor(y) + "°",
    z: Math.floor(z) + "°",
  };
}
