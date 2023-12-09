import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  LocationIcon,
  MeasurerIcon,
  RulerIcon,
  CompasIcon,
  ThermometerIcon,
  DropIcon,
} from "../../../Icon";
import useMagnetometer from "./useMagnetometer";
import useLocation from "./useLocation";
import useClimate from "./useClimate";

export default function Bottom() {
  const { altitude, coords, speed } = useLocation();
  const { angle } = useMagnetometer();
  const { temperature, humidity } = useClimate();

  return (
    <View style={styles.bottom}>
      <View style={styles.bottomItem}>
        <LocationIcon color="#F2F2F2" size={20} />
        {coords ? (
          <Text style={styles.itemColor}>
            {coords.latitude} {"/  "}
            {coords.longitude}
          </Text>
        ) : (
          <Text>{"??"}</Text>
        )}
      </View>
      <View style={styles.bottomItem}>
        <CompasIcon color="#F2F2F2" size={20} />
        <Text style={styles.itemColor}>{angle}</Text>
      </View>
      <View style={styles.bottomItem}>
        <RulerIcon color="#F2F2F2" size={20} />
        {altitude ? (
          <Text style={styles.itemColor}>{altitude.toFixed(2)} msnm</Text>
        ) : (
          <Text>{"??"}</Text>
        )}
      </View>
      <View style={styles.bottomItem}>
        <MeasurerIcon color="#F2F2F2" size={20} />
        {speed ? (
          <Text style={styles.itemColor}>{speed.toFixed(2)} m/s</Text>
        ) : (
          <Text>{"??"}</Text>
        )}
      </View>
      <View style={styles.bottomItem}>
        <ThermometerIcon color="#F2F2F2" size={20} />
        <Text style={styles.itemColor}>{temperature}</Text>
      </View>
      <View style={styles.bottomItem}>
        <DropIcon color="#F2F2F2" size={20} />
        <Text style={styles.itemColor}>{humidity}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottom: {
    flexDirection: "row",
    paddingLeft: 45,
    paddingRight: 50,
    paddingBottom: 20,
    justifyContent: "space-between",
  },
  bottomItem: {
    flexDirection: "row",
  },
  itemColor: {
    color: "#F2F2F2",
  },
});
