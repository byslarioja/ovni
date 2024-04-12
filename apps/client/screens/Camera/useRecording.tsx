import AsyncStorage from "@react-native-async-storage/async-storage";
import * as MediaLibrary from "expo-media-library";
import useAuth from "Screens/Auth/useAuth";
import { MutableRefObject, useEffect } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { Camera } from "expo-camera";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { endTimeAtom, startTimeAtom } from "./sensors/useElapsedTime";
import {
  createHash,
  uploadVideoInfo,
  onError,
  onSuccess,
} from "./services/video.service";
import { readingsAtom } from "./sensors/useReadings";
import { expo as app } from "../../app.json";
import { resetSensorsAtom } from "./sensors/useResetSensors";

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
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const isRecording = useAtomValue(recordingAtom);
  const setRecording = useSetAtom(handleRecordingAtom);
  const resetSensorReadings = useSetAtom(resetSensorsAtom);

  const start = useAtomValue(startTimeAtom);
  const end = useAtomValue(endTimeAtom);
  const readings = useAtomValue(readingsAtom);

  useEffect(() => {
    resetSensorReadings();
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: uploadVideoInfo,
    onError,
    onSuccess,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
      resetSensorReadings();
    },
  });

  const saveVideo = async (uri: string) => {
    const asset = await MediaLibrary.createAssetAsync(uri);
    const hash = await createHash(
      `${asset.creationTime}${asset.modificationTime}`
    );

    await AsyncStorage.setItem(hash, JSON.stringify(asset));

    mutate({
      hash,
      //FIX: should be exactly start:startTime taken from the atom
      start: start || asset.creationTime + asset.duration * 1000,
      //FIX: should be exactly end:endTime taken from the atom
      end: end || asset.creationTime,
      appVersion: app.version,
      asset,
      readings,
      token,
    });
  };

  const handleRecord = async () => {
    try {
      if (isRecording) {
        setRecording(false);
        cameraRef.current.stopRecording();
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

  return { handleRecord, isPending };
}
