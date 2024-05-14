import { CameraView } from "expo-camera";
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
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";

const lang = translate(translation);

export default function Camera() {
  const [zoom, setZoom] = useAtom(zoomAtom);
  const progress = useSharedValue(zoom);
  const min = useSharedValue(0);
  const max = useSharedValue(1);

  const { x, y } = useDeviceRotation();
  const isRecording = useAtomValue(recordingAtom);
  const clock = useClock();

  const cameraRef = useRef<CameraView | null>(null);
  const { handleRecord, isPending } = useRecording(cameraRef);

  if (isPending) {
    const text = lang.t("LOADING.MUTATION_PENDING");

    return <Loader text={text} />;
  }

  return (
    <CameraView
      style={styles.camera}
      zoom={zoom}
      ref={cameraRef}
      videoQuality={"720p"}
      mode="video"
    >
      <View style={styles.container}>
        <TopBar />
        <View style={styles.center}>
          <View
            style={{
              width: 200,
            }}
          >
            <Slider
              onValueChange={setZoom}
              style={styles.slider}
              progress={progress}
              minimumValue={min}
              maximumValue={max}
              renderBubble={() => <></>}
              theme={{
                disableMinTrackTintColor: "#fff",
                maximumTrackTintColor: Theme.color.scheme.black[300],
                minimumTrackTintColor: Theme.color.scheme.black[100],
                cacheTrackTintColor: Theme.color.text.dark,
              }}
            />
          </View>
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
    </CameraView>
  );
}
