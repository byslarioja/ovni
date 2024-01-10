import { useEffect, useState } from "react";

export default function useClimate() {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);

  const LONG = "-66.815095";
  const LAT = "-29.382672";

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LONG}&current=temperature_2m,relative_humidity_2m`
    )
      .then((response) => response.json())
      .then((response) => {
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
  }, []);

  return {
    temperature,
    humidity,
  };
}
