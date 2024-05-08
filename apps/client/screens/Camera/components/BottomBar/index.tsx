import React from "react";
import { View } from "react-native";
import { styles } from "./styles";
import {
  LocationIcon,
  MeasurerIcon,
  RulerIcon,
  CompasIcon,
  ThermometerIcon,
  DropIcon,
} from "Components/Icon";
import useMagnetometer from "../../sensors/useMagnetometer";
import { SensorValue } from "../SensorValue";
import useClimateReadings from "../../sensors/useClimate";
import useGPS from "Screens/Camera/sensors/useGPS";
import { ClimatePrimitive } from "globals/sensor.primitives";
import { translate } from "Shared/utils/translate";

const i18n = translate({
  es: { NOT_AVAILABLE: "N/D" },
  en: { NOT_AVAILABLE: "N/A" },
});

export default function BottomBar() {
  const climate = useClimateReadings();
  const { angle } = useMagnetometer();
  const location = useGPS();

  return (
    <View style={styles.bottom}>
      <SensorValue
        value={
          location.gps
            ? location.gps.coords
            : {
                latitude: i18n.t("NOT_AVAILABLE")!,
                longitude: i18n.t("NOT_AVAILABLE")!,
              }
        }
        isPending={location.isPending}
        isError={location.isError}
        icon={<LocationIcon />}
        format={formatCoords}
      />

      <SensorValue
        value={angle ?? i18n.t("NOT_AVAILABLE")!}
        isPending={!angle}
        isError={false}
        icon={<CompasIcon />}
        format={(value: string) => value}
      />

      <SensorValue
        value={i18n.t("NOT_AVAILABLE")!}
        isPending={false}
        isError={false}
        icon={<RulerIcon />}
        format={formatAltitude}
      />
      {/* <SensorValue
        value={location.gps ? location.gps.altitude : i18n.t('NOT_AVAILABLE')!}
        isPending={location.isPending}
        isError={location.isError}
        icon={<RulerIcon />}
        format={formatAltitude}
      /> */}

      <SensorValue
        value={location.gps ? location.gps.speed : i18n.t("NOT_AVAILABLE")!}
        isPending={location.isPending}
        isError={location.isError}
        icon={<MeasurerIcon />}
        format={formatSpeed}
      />

      <SensorValue
        value={{
          ...climate,
          temperature: climate.temperature ?? i18n.t("NOT_AVAILABLE")!,
          humidity: climate.humidity ?? i18n.t("NOT_AVAILABLE")!,
        }}
        isPending={climate.isPending}
        isError={climate.isError}
        icon={<ThermometerIcon />}
        format={formatTemperature}
      />

      <SensorValue
        value={{
          ...climate,
          temperature: climate.temperature ?? i18n.t("NOT_AVAILABLE")!,
          humidity: climate.humidity ?? i18n.t("NOT_AVAILABLE")!,
        }}
        isPending={climate.isPending}
        isError={climate.isError}
        icon={<DropIcon />}
        format={formatHumidity}
      />
    </View>
  );
}

const formatHumidity = (value: ClimatePrimitive) => value.humidity;
const formatTemperature = (value: ClimatePrimitive) => value.temperature;

const formatAltitude = (value: number | string) => {
  if (typeof value === "string") return value;

  return `${value.toFixed(2)}msnm`;
};

const formatSpeed = (value: number | string) => {
  if (typeof value === "string") return value;

  return `${value.toFixed(2)}m/s`;
};

const formatCoords = (coords: {
  latitude: number | string;
  longitude: number | string;
}) => `${coords.latitude}/${coords.longitude}`;
