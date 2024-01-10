import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import {
  LocationIcon,
  MeasurerIcon,
  RulerIcon,
  CompasIcon,
  ThermometerIcon,
  DropIcon,
} from "../../../../components/Icon";
import useMagnetometer from "./useMagnetometer";
import useLocation from "./useLocation";
import useClimate from "./useClimate";

export default function BottomBar() {
  const { altitude, coords, speed } = useLocation();
  const { angle } = useMagnetometer();
  const { temperature, humidity } = useClimate();
  const iconColor = "#F2F2F2";

  return (
    <View style={styles.bottom}>
      <View style={styles.bottomItem}>
        <LocationIcon color={iconColor} size={20} />
        {coords ? (
          <Text style={styles.itemColor}>
            {coords.latitude} {"/  "}
            {coords.longitude}
          </Text>
        ) : (
          <Text style={styles.itemColor}>{"??"}</Text>
        )}
      </View>
      <View style={styles.bottomItem}>
        <CompasIcon color={iconColor} size={20} />
        <Text style={styles.itemColor}>{angle}</Text>
      </View>
      <View style={styles.bottomItem}>
        <RulerIcon color={iconColor} size={20} />
        {altitude ? (
          <Text style={styles.itemColor}>{altitude.toFixed(2)} msnm</Text>
        ) : (
          <Text style={styles.itemColor}>{"??"}</Text>
        )}
      </View>
      <View style={styles.bottomItem}>
        <MeasurerIcon color={iconColor} size={20} />
        {speed ? (
          <Text style={styles.itemColor}>{speed.toFixed(2)} m/s</Text>
        ) : (
          <Text style={styles.itemColor}>{"??"}</Text>
        )}
      </View>
      <View style={styles.bottomItem}>
        <ThermometerIcon color={iconColor} size={20} />
        <Text style={styles.itemColor}>{temperature}</Text>
      </View>
      <View style={styles.bottomItem}>
        <DropIcon color={iconColor} size={20} />
        <Text style={styles.itemColor}>{humidity}</Text>
      </View>
    </View>
  );
}
