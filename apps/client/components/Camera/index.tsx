import { Camera } from "expo-camera";
import Slider from "@react-native-community/slider";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import Bottom from "./Components/Bottom";

import Top from "./Components/Top";
import useGyro from "./Components/useGyro";

export default function CameraView() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [zoom, setZoom] = useState(0);
  const [rec, setRec] = useState(false);
  const [clock, setClock] = useState(new Date());
  const { x, y } = useGyro();

  useEffect(() => {
    const interval = setInterval(() => {
      setClock(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <Camera style={styles.camera} zoom={zoom}>
      <View style={styles.container}>
        <Top />
        <View style={styles.center}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#F2F2F2"
            maximumTrackTintColor="#F2F2F2"
            thumbTintColor="#F2F2F2"
            onValueChange={setZoom}
          />
          <View style={styles.rightSide}>
            <View>
              <Text style={styles.text}>
                {clock.toLocaleDateString()} {clock.toLocaleTimeString()}
              </Text>
              <Text style={styles.text}>v1.0.0</Text>
            </View>
            {rec ? (
              <TouchableOpacity
                style={styles.recOnButton}
                onPress={() => setRec(!rec)}
              >
                <View style={styles.recOnCenterButton} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.recOffButton}
                onPress={() => setRec(!rec)}
              />
            )}
            <View>
              <Text style={styles.text}>Zoom: {Math.trunc(zoom * 100)}%</Text>
              <Text style={styles.text}>Inclinación vertical: {x}</Text>
              <Text style={styles.text}>Inclinación horizontal: {y}</Text>
            </View>
          </View>
        </View>
        <Bottom />
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  camera: {
    height: "100%",
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  center: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    paddingRight: 40,
  },
  slider: {
    width: 200,
    height: 200,
    marginLeft: -50,
    marginTop: "auto",
    marginBottom: "auto",
    transform: [{ rotate: "270deg" }],
  },
  rightSide: {
    backgroundColor: "transparent",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  recOffButton: {
    height: 75,
    width: 75,
    borderColor: "#f2f2f2",
    borderRadius: 100,
    borderWidth: 5,
    marginLeft: "auto",
  },
  recOnButton: {
    height: 75,
    width: 75,
    backgroundColor: "#f2f2f2",
    borderRadius: 100,
    marginLeft: "auto",
    justifyContent: "center",
  },
  recOnCenterButton: {
    height: 20,
    width: 20,
    backgroundColor: "#E83F3F",
    marginLeft: "auto",
    marginRight: "auto",
  },
  text: {
    color: "#F2F2F2",
    textAlign: "right",
  },
});
