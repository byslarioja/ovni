import * as Location from "expo-location";
import { GPSReading } from "./types";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

const GPS_REFETCH_INTERVAL = Number(process.env.EXPO_PUBLIC_GPS_INTERVAL);

export const GPSReadingsAtom = atom<GPSReading[]>([]);

export const lastAvailableGPSReadingAtom = atom((get) => {
  const gpsReadings = get(GPSReadingsAtom);

  return gpsReadings.at(-1)?.value;
});

export default function useGPS() {
  const setReadings = useSetAtom(GPSReadingsAtom);
  const lastAvailableCoords = useAtomValue(lastAvailableGPSReadingAtom);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        setIsError(true);
        return;
      }

      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: GPS_REFETCH_INTERVAL,
        },
        (position) => {
          setReadings((prev) => [
            ...prev,
            {
              value: {
                coords: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                },
                speed: position.coords.speed,
                altitude: position.coords.altitude,
              },
              timestamp: Date.now(),
            },
          ]);
          setIsPending(false);
        }
      );

      return () => locationSubscription.remove();
    })();
  }, []);

  return {
    gps: lastAvailableCoords,
    isPending,
    isError,
  };
}
