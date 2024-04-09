import { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useAtomValue, useSetAtom } from "jotai";
import { recordingAtom } from "./useRecording";
import {
  elapsedTimeAtom,
  endTimeAtom,
  startTimeAtom,
} from "./sensors/useElapsedTime";

export function useCamera() {
  const [zoom, setZoom] = useState(0);
  const isRecording = useAtomValue(recordingAtom);

  const setElapsedTime = useSetAtom(elapsedTimeAtom);
  const setStartTime = useSetAtom(startTimeAtom);
  const setEndTime = useSetAtom(endTimeAtom);

  const [mediaLibraryStatus, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions();
  const [cameraStatus, requestCameraPermission] = Camera.useCameraPermissions();
  const [microphoneStatus, requestMicrophonePermission] =
    Camera.useMicrophonePermissions();

  useEffect(() => {
    (async () => {
      if (!microphoneStatus?.granted) {
        await Camera.requestMicrophonePermissionsAsync();
      }
      if (!cameraStatus?.granted) {
        await Camera.requestCameraPermissionsAsync();
      }
      if (!mediaLibraryStatus?.granted) {
        await MediaLibrary.requestPermissionsAsync();
      }
    })();
  }, []);

  useEffect(() => {
    let interval = null;

    if (isRecording) {
      const start = Date.now();
      setStartTime(start);

      interval = setInterval(() => {
        const totalSeconds = Math.floor((Date.now() - start) / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        setElapsedTime(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      }, 1000);
    } else {
      clearInterval(interval);
      setElapsedTime("00:00:00");
      setEndTime(Date.now());
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  return {
    zoom,
    setZoom,
    cameraStatus,
    requestCameraPermission,
    microphoneStatus,
    requestMicrophonePermission,
    mediaLibraryStatus,
    requestMediaLibraryPermission,
  };
}
