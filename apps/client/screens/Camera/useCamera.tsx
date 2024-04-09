import { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useAtomValue, useSetAtom } from "jotai";
import { recordingAtom } from "./useRecording";
import { formatDate } from "Shared/utils/time";
import { endTimeAtom, startTimeAtom } from "./sensors/useElapsedTime";

export function useCamera() {
  const [zoom, setZoom] = useState(0);
  const [clock, setClock] = useState(new Date());
  const isRecording = useAtomValue(recordingAtom);

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
    const interval = setInterval(() => {
      setClock(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isRecording) {
      const start = Date.now();
      setStartTime(start);
    } else {
      setEndTime(Date.now());
    }
  }, [isRecording]);

  return {
    zoom,
    setZoom,
    clock: formatDate(clock),
    cameraStatus,
    requestCameraPermission,
    microphoneStatus,
    requestMicrophonePermission,
    mediaLibraryStatus,
    requestMediaLibraryPermission,
  };
}
