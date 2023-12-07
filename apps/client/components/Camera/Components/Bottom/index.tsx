import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import {
  LocationIcon,
  MeasurerIcon,
  RulerIcon,
  CompasIcon,
  ThermometerIcon,
  DropIcon,
} from "../../../Icon";

export default function Bottom() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 50,
        },
        (location) => setLocation(location)
      );
    })();
  }, []);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=-29.382672&longitude=-66.815095&current=temperature_2m,relative_humidity_2m"
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
      });
  }, []);

  return (
    <View style={styles.bottom}>
      <View style={styles.bottomItem}>
        <LocationIcon color="#F2F2F2" size={20} />
        <Text style={styles.itemColor}>
          {location?.coords.latitude} {"/  "}
          {location?.coords.longitude}
        </Text>
      </View>
      <View style={styles.bottomItem}>
        <CompasIcon color="#F2F2F2" size={20} />
        <Text style={styles.itemColor}>Angulo</Text>
      </View>
      <View style={styles.bottomItem}>
        <RulerIcon color="#F2F2F2" size={20} />
        <Text style={styles.itemColor}>
          {location?.coords.altitude.toFixed(2)} msnm
        </Text>
      </View>
      <View style={styles.bottomItem}>
        <MeasurerIcon color="#F2F2F2" size={20} />
        <Text style={styles.itemColor}>{location?.coords.speed} m/s</Text>
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
    paddingLeft: 50,
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
