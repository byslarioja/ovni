import { Camera } from "expo-camera";
import Slider from "@react-native-community/slider";
import { Text, TouchableOpacity, View } from "react-native";
import BottomBar from "./components/BottomBar";
import { StatusBar } from "expo-status-bar";
import TopBar from "./components/TopBar";
import useGyro from "./components/useGyro";
import { styles } from "./styles";
import RequestPermission from "Components/RequestPermission";
import { useCamera } from "./useCamera";
import Theme from "Shared/theme";
import { translation } from "./translation";
import { translate } from "Shared/utils/translate";

export default function CameraView() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const { x, y } = useGyro();
  const lang = translate(translation);
  const { zoom, setZoom, rec, setRec, clock } = useCamera();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    <RequestPermission
      title={lang.t("CAMERA.PERMISSIONS")}
      requestPermission={requestPermission}
    />;
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
    </Camera>
  );
}
