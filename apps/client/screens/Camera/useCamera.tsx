import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uploadVideoInfo } from "./camera.service";
import * as Crypto from "expo-crypto";
import useAuth from "Screens/Auth/useAuth";

export function useCamera() {
  const { token } = useAuth();
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
      const hash = Crypto.randomUUID();

      // Save asset to local storage
      await AsyncStorage.setItem(hash, JSON.stringify(asset));

      // Send a POST request to your backend with the asset
      await uploadVideoInfo({ hash, asset }, token);
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
