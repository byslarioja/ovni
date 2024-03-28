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
import useLocation from "../../sensors/useLocation";
import useClimate from "../../sensors/useClimate";

export default function BottomBar() {
  const location = useLocation();
  const climate = useClimate();

  const { angle } = useMagnetometer();

  return (
    <View style={styles.bottom}>
      <SensorValue
        value={`${location?.coords?.latitude}/${location?.coords?.longitude}`}
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
        value={`${location?.altitude?.toFixed(2)}msnm`}
        isPending={!location || location?.isPending}
        isError={location?.isError}
        icon={<RulerIcon />}
      />

      <SensorValue
        value={`${location?.speed?.toFixed(2)} m/s`}
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
