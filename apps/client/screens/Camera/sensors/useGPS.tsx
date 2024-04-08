import * as Location from "expo-location";
import { useQuery } from "@tanstack/react-query";
import { GPSReading } from "./types";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

const GPS_REFETCH_INTERVAL = Number(process.env.EXPO_PUBLIC_GPS_INTERVAL);

const getLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    console.error("Permission not granted");
    return;
  }

  const location = await Location.getCurrentPositionAsync({});

  return location;
};

export const GPSReadingsAtom = atom<GPSReading[]>([]);

export const lastAvailableGPSReadingAtom = atom((get) => {
  const gpsReadings = get(GPSReadingsAtom);

  return gpsReadings.at(-1)?.value;
});

export default function useGPS() {
  const setReadings = useSetAtom(GPSReadingsAtom);
  const lastAvailableCoords = useAtomValue(lastAvailableGPSReadingAtom);

  const { data, isPending, isError } = useQuery({
    queryKey: ["location"],
    queryFn: getLocation,
    refetchInterval: GPS_REFETCH_INTERVAL,
  });

  useEffect(() => {
    setReadings((prev) => [
      ...prev,
      {
        value: {
          coords: {
            latitude: data?.coords.latitude,
            longitude: data?.coords.longitude,
          },
          speed: data?.coords.speed,
          altitude: data?.coords.altitude,
        },
        timestamp: Date.now(),
      },
    ]);
  }, [data]);

  return {
    gps: lastAvailableCoords,
    isPending,
    isError,
  };
}
