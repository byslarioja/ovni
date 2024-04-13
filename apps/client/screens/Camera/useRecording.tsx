import AsyncStorage from "@react-native-async-storage/async-storage";
import * as MediaLibrary from "expo-media-library";
import { MutableRefObject, useEffect } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { Camera } from "expo-camera";
import { endTimeAtom, startTimeAtom } from "./sensors/useElapsedTime";
import { createHash } from "./services/video.service";
import { resetSensorsAtom } from "./sensors/useResetSensors";
import { useUpload } from "./useUpload";

export const recordingAtom = atom(false);

const handleRecordingAtom = atom(null, (get, set, update: boolean) => {
  if (update) {
    set(startTimeAtom, Date.now());
  } else {
    set(endTimeAtom, Date.now());
  }

  set(recordingAtom, (prev) => !prev);
});

export function useRecording(cameraRef: MutableRefObject<Camera>) {
  const isRecording = useAtomValue(recordingAtom);
  const setRecording = useSetAtom(handleRecordingAtom);
  const resetSensorReadings = useSetAtom(resetSensorsAtom);

  const { handleUpload, isPending, isUploading, progress } = useUpload();

  useEffect(() => {
    resetSensorReadings();
  }, []);

  const saveVideo = async (uri: string) => {
    const asset = await MediaLibrary.createAssetAsync(uri);
    const hash = await createHash(
      `${asset.creationTime}${asset.modificationTime}`
    );

    await AsyncStorage.setItem(hash, JSON.stringify(asset));

    await handleUpload({ asset, hash });
  };

  const handleRecord = async () => {
    try {
      if (isRecording) {
        setRecording(false);
        await cameraRef.current.stopRecording();
      } else {
        setRecording(true);
        const video = await cameraRef.current.recordAsync();
        saveVideo(video.uri);
        resetSensorReadings();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { handleRecord, isPending, isUploading, progress };
}
