import { Camera } from "expo-camera";
import Slider from "@react-native-community/slider";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import BottomBar from "./components/BottomBar";
import { StatusBar } from "expo-status-bar";
import TopBar from "./components/TopBar";
import useGyro from "./components/useGyro";
import { styles } from "./styles";
import { translate } from "../../shared/utils/translate";
import { translation } from "./translation";
import Theme from "../../shared/theme";

export default function CameraView() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [zoom, setZoom] = useState(0);
  const [rec, setRec] = useState(false);
  const [clock, setClock] = useState(new Date());
  const { x, y } = useGyro();
  const lang = translate(translation);

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
        <StatusBar style="dark" />
      </View>
    );
  }

  return (
    <Camera style={styles.camera} zoom={zoom}>
      <View style={styles.container}>
        <TopBar />
        <View style={styles.center}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor={Theme.color.text.light}
            maximumTrackTintColor={Theme.color.text.light}
            thumbTintColor={Theme.color.text.light}
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
                style={[styles.recButton, styles.recOnButton]}
                onPress={() => setRec(!rec)}
              >
                <View style={styles.recOnCenterButton} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.recButton, styles.recOffButton]}
                onPress={() => setRec(!rec)}
              />
            )}
            <View>
              <Text style={styles.text}>Zoom: {Math.trunc(zoom * 100)}%</Text>
              <Text style={styles.text}>
                {lang.t("CAMERA.VERTICAL_INCLINATION")}:{" "}
                {x !== 0 && y !== 0 ? x : "?"}
              </Text>
              <Text style={styles.text}>
                {lang.t("CAMERA.HORIZONTAL_INCLINATION")}:{" "}
                {y !== 0 && x !== 0 ? y : "?"}
              </Text>
            </View>
          </View>
        </View>
        <BottomBar />
      </View>
      <StatusBar style="light" />
    </Camera>
  );
}