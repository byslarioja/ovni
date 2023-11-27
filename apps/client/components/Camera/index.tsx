import { Camera } from "expo-camera";
import Slider from "@react-native-community/slider";
import { Button, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

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
    <View style={styles.container}>
      <Camera style={styles.camera} zoom={zoom}>
        <View style={styles.buttonContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#FFFFFF"
            thumbTintColor="#FFFFFF"
            onValueChange={setZoom}
          />
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
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
