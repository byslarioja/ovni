import { useEffect, useState } from "react";
import useLocation from "./useLocation";

const API_URL_PREFIX = "https://api.open-meteo.com/v1/forecast";
const API_PARAMS = "current=temperature_2m,relative_humidity_2m";

const fetchData = async ({
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
  const [climateData, setClimateData] = useState<ClimateData>({
    temperature: null,
    humidity: null,
  });

  useEffect(() => {
    if (!coords) return;

    const fetchAndSetData = async () => {
      const { current, current_units } = await fetchData(coords);

      setClimateData({
        temperature: current.temperature_2m + current_units.temperature_2m,
        humidity:
          current.relative_humidity_2m + current_units.relative_humidity_2m,
      });
    };

    fetchAndSetData(); // Fetch data immediately on component mount

    const intervalId = setInterval(fetchAndSetData, 10000); // Then fetch data every 10 seconds

    // Clear interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [coords]);

  return climateData;
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

type ClimateData = {
  temperature: string | null;
  humidity: string | null;
};
