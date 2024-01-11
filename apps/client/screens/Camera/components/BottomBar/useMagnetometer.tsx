import { useEffect, useState } from "react";
import { Magnetometer } from "expo-sensors";

export default function useMagnetometer() {
  const [subscription, setSubscription] = useState(null);
  const [magnetometer, setMagnetometer] = useState(0);

  useEffect(() => {
    _toggle();
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((data) => {
        setMagnetometer(_angle(data));
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const _angle = (magnetometer: { x: number; y: number; z: number }) => {
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
    var d = Math.floor(deg); // make degrees
    var m = Math.floor((deg - d) * 60); // make minutes
    var s =
      Math.round(((deg - d) * 60 - m) * 60 * Math.pow(10, dplaces)) /
      Math.pow(10, dplaces); // Make sec rounded
    s == 60 && (m++, (s = 0)); // if seconds rounds to 60 then increment minutes, reset seconds
    m == 60 && (d++, (m = 0)); // if minutes rounds to 60 then increment degress, reset minutes
    return d + "° " + m + "' " + s + '"'; // create output DMS string
  };

  return { angle: degToDMS(magnetometer) };
}
