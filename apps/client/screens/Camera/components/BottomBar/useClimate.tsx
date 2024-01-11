import { useEffect, useState } from "react";
import useLocation from "./useLocation";

const API_URL_PREFIX = "https://api.open-meteo.com/v1/forecast";
const API_PARAMS = "current=temperature_2m,relative_humidity_2m";

export default function useClimate() {
  const [temperature, setTemperature] = useState<string | null>(null);
  const [humidity, setHumidity] = useState<string | null>(null);
  const { coords } = useLocation();

  useEffect(() => {
    if (coords) {
      const LONG = coords.longitude;
      const LAT = coords.latitude;

      fetch(`${API_URL_PREFIX}?latitude=${LAT}&longitude=${LONG}&${API_PARAMS}`)
        .then((response) => response.json())
        .then((response: Response) => {
          setTemperature(
            response.current.temperature_2m +
              " " +
              response.current_units.temperature_2m
          );
          setHumidity(
            response.current.relative_humidity_2m +
              response.current_units.relative_humidity_2m
          );
        })
        .catch((error) => {
          setTemperature("?");
          setHumidity("?");

          console.error(error);
        });
    }
  }, [coords]);

  return {
    temperature,
    humidity,
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
