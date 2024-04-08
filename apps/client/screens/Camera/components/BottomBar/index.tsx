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
import useGPSReadings from "Screens/Camera/sensors/useGPS";

export default function BottomBar() {
  const climate = useClimateReadings();
  const { angle } = useMagnetometer();
  const location = useGPSReadings();

  return (
    <View style={styles.bottom}>
      <SensorValue
        value={`${location.gps?.coords?.latitude}/${location.gps?.coords?.longitude}`}
        isPending={!location || location?.isPending}
        isError={location?.isError}
        icon={<LocationIcon />}
      />

      <SensorValue
        value={angle}
        isPending={!angle}
        isError={false}
        icon={<CompasIcon />}
      />

      <SensorValue
        value={`${location.gps?.altitude?.toFixed(2)}msnm`}
        isPending={!location || location?.isPending}
        isError={location?.isError}
        icon={<RulerIcon />}
      />

      <SensorValue
        value={`${location.gps?.speed?.toFixed(2)} m/s`}
        isPending={!location || location?.isPending}
        isError={location?.isError}
        icon={<MeasurerIcon />}
      />

      <SensorValue
        value={climate.temperature}
        isPending={climate.isPending}
        isError={climate.isError}
        icon={<ThermometerIcon />}
      />

      <SensorValue
        value={climate.humidity}
        isPending={climate.isPending}
        isError={climate.isError}
        icon={<DropIcon />}
      />
    </View>
  );
}
