import { GPSReading } from "./types";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLocation } from "../services/sensors.service";

const GPS_REFETCH_INTERVAL = Number(process.env.EXPO_PUBLIC_GPS_INTERVAL);

export const GPSReadingsAtom = atom<GPSReading[]>([]);

export const lastAvailableGPSReadingAtom = atom((get) => {
  const gpsReadings = get(GPSReadingsAtom);

  if (!gpsReadings) {
    return;
  }

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
    setReadings((prev) => {
      if (!position) return;

      let readings: GPSReading[] = [];

      if (prev) readings = [...prev];

      return [
        ...readings,
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
      ];
    });
  }, [position]);

  return {
    gps: lastAvailableCoords,
    isPending: isPending || !lastAvailableCoords,
    isError,
  };
}
