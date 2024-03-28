import { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import useAuth from "Screens/Auth/useAuth";
import { useAtomValue } from "jotai";
import { recordingAtom } from "./useRecording";
import { formatDate } from "Shared/utils/time";

export function useCamera() {
  const [zoom, setZoom] = useState(0);
  const [clock, setClock] = useState(new Date());
  const isRecording = useAtomValue(recordingAtom);
  const [elapsedTime, setElapsedTime] = useState("00:00:00");

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
    const interval = setInterval(() => {
      setClock(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval = null;
    if (isRecording) {
      const start = Date.now();
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
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  return {
    zoom,
    setZoom,
    elapsedTime,
    clock: formatDate(clock),
    cameraStatus,
    requestCameraPermission,
    microphoneStatus,
    requestMicrophonePermission,
    mediaLibraryStatus,
    requestMediaLibraryPermission,
  };
}
