import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function useLocation() {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [speed, setSpeed] = useState<number | null>(null);
  const [altitude, setAltitude] = useState<number | null>(null);

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
        (location) => {
          setCoords({
            latitude: location?.coords.latitude,
            longitude: location?.coords.longitude,
          }),
            setSpeed(location?.coords.speed),
            setAltitude(location?.coords.altitude);
        }
      );
    })();
  }, []);

  return {
    coords,
    speed,
    altitude,
  };
}

type Coords = {
  latitude: number;
  longitude: number;
};
