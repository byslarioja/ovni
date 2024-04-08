import { Camera } from "expo-camera";
import Slider from "@react-native-community/slider";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import BottomBar from "./components/BottomBar";
import TopBar from "./components/TopBar";
import useDeviceRotation from "./sensors/useDeviceRotation";
import { styles } from "./styles";
import RequestPermission from "Components/RequestPermission";
import { useCamera } from "./useCamera";
import Theme from "Shared/theme";
import { translation } from "./translation";
import { translate } from "Shared/utils/translate";
import { useRef } from "react";
import appConfig from "../../app.json";
import { recordingAtom, useRecording } from "./useRecording";
import { useAtomValue } from "jotai";
import { Loader } from "./components/Loader";

export default function CameraView() {
  const { x, y } = useDeviceRotation();
  const lang = translate(translation);
  const isRecording = useAtomValue(recordingAtom);

  const {
    zoom,
    setZoom,
    clock,
    cameraStatus,
    requestCameraPermission,
    microphoneStatus,
    requestMicrophonePermission,
    mediaLibraryStatus,
    requestMediaLibraryPermission,
  } = useCamera();

  const cameraRef = useRef(null);
  const { handleRecord } = useRecording(cameraRef);

  if (!cameraStatus || !microphoneStatus || !mediaLibraryStatus) {
    // Camera permissions are still loading
    return <Loader />;
  }

  if (!cameraStatus.granted) {
    // Camera permissions are not granted yet
    return (
      <RequestPermission
        title={lang.t("CAMERA.PERMISSIONS.CAMERA")}
        requestPermission={requestCameraPermission}
      />
    );
  }

  if (!microphoneStatus.granted) {
    // Microphone permissions are not granted yet
    return (
      <RequestPermission
        title={lang.t("CAMERA.PERMISSIONS.MICROPHONE")}
        requestPermission={requestMicrophonePermission}
      />
    );
  }

  if (!mediaLibraryStatus.granted) {
    // Microphone permissions are not granted yet
    return (
      <RequestPermission
        title={lang.t("CAMERA.PERMISSIONS.MICROPHONE")}
        requestPermission={requestMediaLibraryPermission}
      />
    );
  }

  return (
    <Camera style={styles.camera} zoom={zoom} ref={cameraRef}>
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
              <Text style={styles.text}>{clock}</Text>
              <Text style={styles.text}>v{appConfig.expo.version}</Text>
            </View>
            {isRecording ? (
              <TouchableOpacity
                style={[styles.recButton, styles.recOnButton]}
                onPress={handleRecord}
              >
                <View style={styles.recOnCenterButton} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.recButton, styles.recOffButton]}
                onPress={handleRecord}
              />
            )}
            <View>
              <Text style={styles.text}>Zoom: {Math.trunc(zoom * 100)}%</Text>
              <Text style={styles.text}>
                {lang.t("CAMERA.VERTICAL_INCLINATION")}:{" "}
                {x || <ActivityIndicator size={14} />}
              </Text>
              <Text style={styles.text}>
                {lang.t("CAMERA.HORIZONTAL_INCLINATION")}:{" "}
                {y || <ActivityIndicator size={14} />}
              </Text>
            </View>
          </View>
        </View>
        <BottomBar />
      </View>
    </Camera>
  );
}
