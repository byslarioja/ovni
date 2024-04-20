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
import { ClimatePrimitive, GPSPrimitive } from "globals/sensor.primitives";

export default function BottomBar() {
  const climate = useClimateReadings();
  const { angle } = useMagnetometer();
  const location = useGPS();

  return (
    <View style={styles.bottom}>
      <SensorValue
        value={location.gps}
        isPending={location.isPending}
        isError={location.isError}
        icon={<LocationIcon />}
        format={formatCoords}
      />

      <SensorValue
        value={angle}
        isPending={!angle}
        isError={false}
        icon={<CompasIcon />}
        format={(value: string) => value}
      />

      <SensorValue
        value={location.gps}
        isPending={location.isPending}
        isError={location.isError}
        icon={<RulerIcon />}
        format={formatAltitude}
      />

      <SensorValue
        value={location.gps}
        isPending={location.isPending}
        isError={location.isError}
        icon={<MeasurerIcon />}
        format={formatSpeed}
      />

      <SensorValue
        value={climate}
        isPending={climate.isPending}
        isError={climate.isError}
        icon={<ThermometerIcon />}
        format={formatTemperature}
      />

      <SensorValue
        value={climate}
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
const formatAltitude = (value: GPSPrimitive) =>
  `${value.altitude.toFixed(2)}msnm`;
const formatSpeed = (value: GPSPrimitive) => `${value.speed.toFixed(2)}m/s`;
const formatCoords = (value: GPSPrimitive) =>
  `${value.coords.latitude}/${value.coords.longitude}`;
