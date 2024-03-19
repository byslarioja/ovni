import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";

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
    const asset = await MediaLibrary.createAssetAsync(uri);

    //TODO: send asset's info to api to prevent trickery
    console.log(asset);
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
