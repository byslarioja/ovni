import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uploadVideoInfo } from "./camera.service";
import * as Random from "expo-random";

export function useCamera() {
  const [zoom, setZoom] = useState(0);
  const [rec, setRec] = useState(false);
  const [clock, setClock] = useState(new Date());

  const [mediaLibraryStatus, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions();
  const [cameraStatus, requestCameraPermission] = Camera.useCameraPermissions();
  const [microphoneStatus, requestMicrophonePermission] =
    Camera.useMicrophonePermissions();

  useEffect(() => {
    (async () => {
      await Camera.requestMicrophonePermissionsAsync();
      await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setClock(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const saveVideo = async (uri: string) => {
    try {
      const asset = await MediaLibrary.createAssetAsync(uri);

      // Create a hash based on asset.id and asset.creationTime
      const randomBytes = await Random.getRandomBytesAsync(16);
      const hash = [...randomBytes]
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");

      // Save asset to local storage
      await AsyncStorage.setItem(hash, JSON.stringify(asset));

      // Send a POST request to your backend with the asset
      await uploadVideoInfo({ hash, asset });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    zoom,
    setZoom,
    rec,
    setRec,
    clock,
    cameraStatus,
    requestCameraPermission,
    microphoneStatus,
    requestMicrophonePermission,
    mediaLibraryStatus,
    requestMediaLibraryPermission,
    saveVideo,
  };
}
