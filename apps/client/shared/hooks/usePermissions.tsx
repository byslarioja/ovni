import { useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

export function usePermissions() {
  const [mediaLibraryStatus, mediaLibraryRequest] =
    MediaLibrary.usePermissions();
  const [cameraStatus, cameraRequest] = useCameraPermissions();
  const [microphoneStatus, microphoneRequest] = useMicrophonePermissions();
  const [locationStatus, locationRequest] = Location.useForegroundPermissions();

  const isPending =
    !cameraStatus ||
    !locationStatus ||
    !mediaLibraryStatus ||
    !microphoneStatus;

  const missing = [
    cameraStatus && "camera",
    locationStatus && "location",
    mediaLibraryStatus && "mediaLibrary",
    microphoneStatus && "microphone",
  ];

  return {
    permissions: [
      {
        name: "camera",
        status: cameraStatus,
        request: cameraRequest,
      },
      {
        name: "location",
        status: locationStatus,
        request: locationRequest,
      },
      {
        name: "mediaLibrary",
        status: mediaLibraryStatus,
        request: mediaLibraryRequest,
      },
      {
        name: "microphone",
        status: microphoneStatus,
        request: microphoneRequest,
      },
    ],
    isPending,
    missing,
  };
}
