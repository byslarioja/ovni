import { useEffect, useState } from "react";
import { Gyroscope } from "expo-sensors";

export default function useGyro() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [subscription, setSubscription] = useState(null);

  const _slow = () => Gyroscope.setUpdateInterval(1000);
  const _fast = () => Gyroscope.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener((gyroscopeData) => {
        setData(gyroscopeData);
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

  const degToDMS = (deg, dplaces = 0) => {
    var d = Math.floor(deg); // make degrees
    var m = Math.floor((deg - d) * 60); // make minutes
    var s =
      Math.round(((deg - d) * 60 - m) * 60 * Math.pow(10, dplaces)) /
      Math.pow(10, dplaces); // Make sec rounded
    s == 60 && (m++, (s = 0)); // if seconds rounds to 60 then increment minutes, reset seconds
    m == 60 && (d++, (m = 0)); // if minutes rounds to 60 then increment degress, reset minutes
    return d + "° " + m + "' " + s + '"'; // create output DMS string
  };

  return { x: degToDMS(x), y: degToDMS(y), z: degToDMS(z) };
}
