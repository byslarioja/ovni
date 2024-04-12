import { lastAvailableGPSReadingAtom } from "./useGPS";
import { useQuery } from "@tanstack/react-query";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { ClimateReadings, ClimateResponse } from "./types";
import axios from "axios";

const API_URL_PREFIX = "https://api.open-meteo.com/v1/forecast";
const API_PARAMS = "current=temperature_2m,relative_humidity_2m";
const CLIMATE_REFETCH_INTERVAL = Number(
  process.env.EXPO_PUBLIC_CLIMATE_INTERVAL
);

const getClimate = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): Promise<ClimateResponse> => {
  const URI = `${API_URL_PREFIX}?latitude=${latitude}&longitude=${longitude}&${API_PARAMS}`;
  const response = await axios.get(URI);

  return response.data;
};

export const climateReadingsAtom = atom<ClimateReadings[]>([]);

export const lastAvailableClimateAtom = atom((get) => {
  const climateReadings = get(climateReadingsAtom);

  return climateReadings.at(-1)?.value;
});

export default function useClimateReadings() {
  const lastAvailableClimate = useAtomValue(lastAvailableClimateAtom);
  const lastAvailableCoords = useAtomValue(lastAvailableGPSReadingAtom);
  const setClimateReadings = useSetAtom(climateReadingsAtom);

  const { isPending, isLoading, isError, data } = useQuery({
    queryKey: ["climate"],
    queryFn: () => getClimate(lastAvailableCoords.coords),
    refetchInterval: CLIMATE_REFETCH_INTERVAL,
  });

  useEffect(() => {
    if (data) {
      const { current, current_units: unit } = data;

      setClimateReadings((prev) => [
        ...prev,
        {
          value: {
            temperature: current?.temperature_2m + unit?.temperature_2m,
            humidity:
              current?.relative_humidity_2m + unit?.relative_humidity_2m,
          },
          timestamp: Date.now(),
        },
      ]);
    }
  }, [data]);

  return {
    isPending,
    isLoading,
    isError,
    ...lastAvailableClimate,
  };
}
