import { useCallback, useEffect, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uploadVideoInfo } from "./camera.service";
import * as Crypto from "expo-crypto";
import useAuth from "Screens/Auth/useAuth";

export function useCamera() {
  const { token } = useAuth();
  const [zoom, setZoom] = useState(0);
  const [rec, setRec] = useState(false);
  const [clock, setClock] = useState(new Date());

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
    if (rec) {
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
  }, [rec]);

  const saveVideo = useCallback(
    async (uri: string) => {
      try {
        const asset = await MediaLibrary.createAssetAsync(uri);
        const hash = Crypto.randomUUID();
        await AsyncStorage.setItem(hash, JSON.stringify(asset));
        await uploadVideoInfo({ hash, asset }, token);
      } catch (error) {
        console.error(error);
      }
    },
    [token]
  );

  return {
    zoom,
    setZoom,
    rec,
    setRec,
    elapsedTime,
    clock:
      clock.toLocaleDateString() +
      " " +
      clock.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    cameraStatus,
    requestCameraPermission,
    microphoneStatus,
    requestMicrophonePermission,
    mediaLibraryStatus,
    requestMediaLibraryPermission,
    saveVideo,
  };
}
