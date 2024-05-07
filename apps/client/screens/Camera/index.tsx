import { Camera as ExpoCamera } from "expo-camera";
import Slider from "@react-native-community/slider";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import BottomBar from "./components/BottomBar";
import TopBar from "./components/TopBar";
import useDeviceRotation from "./sensors/useDeviceRotation";
import { styles } from "./styles";
import Theme from "Shared/theme";
import { translation } from "./translation";
import { translate } from "Shared/utils/translate";
import { useRef } from "react";
import appConfig from "../../app.json";
import { recordingAtom, useRecording } from "./hooks/useRecording";
import { useAtom, useAtomValue } from "jotai";
import { Loader } from "Components/Loader";
import { useClock } from "./hooks/useClock";
import { zoomAtom } from "./sensors/useZoom";

const lang = translate(translation);

export default function Camera() {
  const { x, y } = useDeviceRotation();
  const isRecording = useAtomValue(recordingAtom);
  const clock = useClock();
  const [zoom, setZoom] = useAtom(zoomAtom);

  const cameraRef = useRef(null);
  const { handleRecord, isPending } = useRecording(cameraRef);

  if (isPending) {
    const text = lang.t("LOADING.MUTATION_PENDING");

    return <Loader text={text} />;
  }

  return (
    <ExpoCamera style={styles.camera} zoom={zoom} ref={cameraRef}>
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
              <TouchableOpacity onPress={handleRecord}>
                <View style={[styles.recButton, styles.recOnButton]}>
                  <View style={styles.recOnCenterButton} />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleRecord}>
                <View style={[styles.recButton, styles.recOffButton]}></View>
              </TouchableOpacity>
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
    </ExpoCamera>
  );
}
