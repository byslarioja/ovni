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
import useMagnetometer, {
  magnetometerAtom,
} from "../../sensors/useMagnetometer";
import { SensorValue } from "../SensorValue";
import { gpsAtom } from "../../sensors/useLocation";
import { climateAtom } from "../../sensors/useClimate";
import { useAtomValue } from "jotai";

export default function BottomBar() {
  const climate = useAtomValue(climateAtom);
  const location = useAtomValue(gpsAtom);

  useMagnetometer(); //needed to subscribe to magnetometer changes
  const angle = useAtomValue(magnetometerAtom);

  return (
    <View style={styles.bottom}>
      <SensorValue
        value={`${location.data?.coords?.latitude}/${location.data?.coords?.longitude}`}
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
        value={`${location.data?.altitude?.toFixed(2)}msnm`}
        isPending={!location || location?.isPending}
        isError={location?.isError}
        icon={<RulerIcon />}
      />

      <SensorValue
        value={`${location.data?.speed?.toFixed(2)} m/s`}
        isPending={!location || location?.isPending}
        isError={location?.isError}
        icon={<MeasurerIcon />}
      />

      <SensorValue
        value={climate.data?.temperature}
        isPending={climate.isPending}
        isError={climate.isError}
        icon={<ThermometerIcon />}
      />

      <SensorValue
        value={climate.data?.humidity}
        isPending={climate.isPending}
        isError={climate.isError}
        icon={<DropIcon />}
      />
    </View>
  );
}
