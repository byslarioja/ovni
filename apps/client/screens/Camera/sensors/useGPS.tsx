import * as Location from "expo-location";
import { GPSReading } from "./types";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLocation } from "../services/sensors.service";

const GPS_REFETCH_INTERVAL = Number(process.env.EXPO_PUBLIC_GPS_INTERVAL);

export const GPSReadingsAtom = atom<GPSReading[]>([]);

export const lastAvailableGPSReadingAtom = atom((get) => {
  const gpsReadings = get(GPSReadingsAtom);

  return gpsReadings.at(-1)?.value;
});

export default function useGPS() {
  const setReadings = useSetAtom(GPSReadingsAtom);
  const lastAvailableCoords = useAtomValue(lastAvailableGPSReadingAtom);
  const {
    isPending,
    isError,
    data: position,
  } = useQuery({
    queryKey: ["gps"],
    queryFn: getLocation,
    refetchInterval: GPS_REFETCH_INTERVAL,
  });

  useEffect(() => {
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
  }, [position]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  return {
    gps: lastAvailableCoords,
    isPending,
    isError,
  };
}
