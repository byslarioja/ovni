import useLocation from "./useLocation";
import { useQuery } from "@tanstack/react-query";

const API_URL_PREFIX = "https://api.open-meteo.com/v1/forecast";
const API_PARAMS = "current=temperature_2m,relative_humidity_2m";

const getClimate = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): Promise<Response> => {
  const URI = `${API_URL_PREFIX}?latitude=${latitude}&longitude=${longitude}&${API_PARAMS}`;

  try {
    const response = await fetch(URI);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export default function useClimate() {
  const { coords } = useLocation();

  const { data, isError, isPending } = useQuery({
    queryKey: ["climate", coords],
    queryFn: () => getClimate(coords),
  });

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
    isError,
    isPending,
  };
}

type Response = {
  current: {
    temperature_2m: string;
    relative_humidity_2m: string;
  };
  current_units: {
    temperature_2m: string;
    relative_humidity_2m: string;
  };
};
