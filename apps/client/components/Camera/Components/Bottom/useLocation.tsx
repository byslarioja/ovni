import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function useLocation() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("er");
        return;
      }

      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
        },
        (location) => setLocation(location)
      );
    })();
  }, []);

  return {
    coords: location?.coords,
    speed: location?.coords.speed,
    altitude: location?.coords.altitude,
  };
}
