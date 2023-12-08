import { Camera } from "expo-camera";
import Slider from "@react-native-community/slider";
import { Button, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Bottom from "./Components/Bottom";

import Top from "./Components/Top";

export default function CameraView() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [zoom, setZoom] = useState(0);

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
    backgroundColor: "#000",
    flex: 1,
  },
  slider: {
    width: 200,
    height: 200,
    marginLeft: -50,
    marginTop: "auto",
    marginBottom: "auto",
    transform: [{ rotate: "270deg" }],
  },
});
