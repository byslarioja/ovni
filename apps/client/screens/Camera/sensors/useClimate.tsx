import { atomWithQuery } from "jotai-tanstack-query";
import { gpsAtom } from "./useLocation";

const API_URL_PREFIX = "https://api.open-meteo.com/v1/forecast";
const API_PARAMS = "current=temperature_2m,relative_humidity_2m";

const getClimate = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): Promise<ClimateResponse> => {
  const URI = `${API_URL_PREFIX}?latitude=${latitude}&longitude=${longitude}&${API_PARAMS}`;

  try {
    const response = await fetch(URI);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const climateAtom = atomWithQuery<ClimateResponse, Error, Climate>(
  (get) => ({
    queryKey: ["climate", get(gpsAtom)?.data?.coords],
    queryFn: () => getClimate(get(gpsAtom)?.data?.coords),
    select: (data) => {
      let temperature: string, humidity: string;

      if (data) {
        const { current, current_units: unit } = data;
        temperature = current.temperature_2m
          ? current.temperature_2m + unit.temperature_2m
          : null;
        humidity = current.relative_humidity_2m
          ? current.relative_humidity_2m + unit.relative_humidity_2m
          : null;
      }
      return {
        temperature,
        humidity,
      };
    },
  })
);

type ClimateResponse = {
  current: {
    temperature_2m: string;
    relative_humidity_2m: string;
  };
  current_units: {
    temperature_2m: string;
    relative_humidity_2m: string;
  };
};

type Climate = {
  temperature: string;
  humidity: string;
};
