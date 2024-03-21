import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function useLocation() {
  const [locationData, setLocationData] = useState<LocationData>({
    coords: null,
    speed: null,
    altitude: null,
  });

  useEffect(() => {
    let subscription: Location.LocationSubscription;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission not granted");
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
        },
        (location) => {
          setLocationData({
            coords: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            speed: location.coords.speed,
            altitude: location.coords.altitude,
          });
        }
      );
    })();

    if (subscription) {
      subscription.remove();
    }
  }, []);

  return locationData;
}

type Coords = {
  latitude: number;
  longitude: number;
};

type LocationData = {
  coords: Coords;
  speed: number;
  altitude: number;
};
