import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { styles } from "./styles";
import {
  LocationIcon,
  MeasurerIcon,
  RulerIcon,
  CompasIcon,
  ThermometerIcon,
  DropIcon,
} from "Components/Icon";
import useMagnetometer from "./useMagnetometer";
import useLocation from "./useLocation";
import useClimate from "./useClimate";
import Theme from "Shared/theme";

export default function BottomBar() {
  const { altitude, coords, speed } = useLocation();
  const { angle } = useMagnetometer();
  const { temperature, humidity } = useClimate();

  return (
    <View style={styles.bottom}>
      <View style={styles.bottomItem}>
        <LocationIcon color={Theme.color.button.neutral} size={20} />
        {coords ? (
          <Text style={styles.itemColor}>
            {coords.latitude} {"/  "}
            {coords.longitude}
          </Text>
        ) : (
          <ActivityIndicator size="small" color={Theme.color.button.neutral} />
        )}
      </View>
      <View style={styles.bottomItem}>
        <CompasIcon color={Theme.color.button.neutral} size={20} />
        <Text style={styles.itemColor}>{angle}</Text>
      </View>
      <View style={styles.bottomItem}>
        <RulerIcon color={Theme.color.button.neutral} size={20} />
        {altitude ? (
          <Text style={styles.itemColor}>{altitude.toFixed(2)} msnm</Text>
        ) : (
          <ActivityIndicator size="small" color={Theme.color.button.neutral} />
        )}
      </View>
      <View style={styles.bottomItem}>
        <MeasurerIcon color={Theme.color.button.neutral} size={20} />
        {speed ? (
          <Text style={styles.itemColor}>{speed.toFixed(2)} m/s</Text>
        ) : (
          <ActivityIndicator size="small" color={Theme.color.button.neutral} />
        )}
      </View>
      <View style={styles.bottomItem}>
        <ThermometerIcon color={Theme.color.button.neutral} size={20} />
        {temperature ? (
          <Text style={styles.itemColor}>{temperature}</Text>
        ) : (
          <ActivityIndicator size="small" color={Theme.color.button.neutral} />
        )}
      </View>
      <View style={styles.bottomItem}>
        <DropIcon color={Theme.color.button.neutral} size={20} />
        {humidity ? (
          <Text style={styles.itemColor}>{humidity}</Text>
        ) : (
          <ActivityIndicator size="small" color={Theme.color.button.neutral} />
        )}
      </View>
    </View>
  );
}
