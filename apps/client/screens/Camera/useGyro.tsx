import { useEffect, useState } from "react";
import { DeviceMotion } from "expo-sensors";
import throttle from "lodash/throttle";

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
      DeviceMotion.addListener(
        throttle((a) => {
          if (!a.rotation) {
            return;
          }
          setData({
            z: (a.rotation.alpha / Math.PI) * 360,
            x: (a.rotation.beta / Math.PI) * 360,
            y: (a.rotation.gamma / Math.PI) * 360,
          });
        }, 200) // Update at most once every 200ms
      )
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
    x: Math.round(x).toString(),
    y: Math.round(y).toString(),
    z: Math.round(z).toString(),
  };
}
