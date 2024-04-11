import AsyncStorage from "@react-native-async-storage/async-storage";
import * as MediaLibrary from "expo-media-library";
import useAuth from "Screens/Auth/useAuth";
import { MutableRefObject, useEffect } from "react";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
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

export function useRecording(cameraRef: MutableRefObject<Camera>) {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const [isRecording, setIsRecording] = useAtom(recordingAtom);
  const resetSensorReadings = useSetAtom(resetSensorsAtom);

  const [startTime, setStartTime] = useAtom(startTimeAtom);
  const [endTime, setEndTime] = useAtom(endTimeAtom);
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

  //FIX: startTime and endTime may become null right before mutation
  useEffect(() => {
    if (isRecording && startTime === null) setStartTime(Date.now());
    if (!isRecording && startTime !== null) setEndTime(Date.now());
  }, [isRecording]);

  const saveVideo = async (uri: string) => {
    const asset = await MediaLibrary.createAssetAsync(uri);
    const hash = await createHash(
      `${asset.creationTime}${asset.modificationTime}`
    );

    await AsyncStorage.setItem(hash, JSON.stringify(asset));

    mutate({
      hash,
      //FIX: should be exactly start:startTime taken from the atom
      start: startTime ? startTime : asset.creationTime,
      //FIX: should be exactly end:endTime taken from the atom
      end: endTime ? endTime : asset.creationTime + asset.duration * 1000,
      appVersion: app.version,
      asset,
      readings,
      token,
    });
  };

  const handleRecord = async () => {
    try {
      if (isRecording) {
        setIsRecording(false);
        cameraRef.current.stopRecording();
      } else {
        resetSensorReadings();
        setIsRecording(true);
        const video = await cameraRef.current.recordAsync();
        saveVideo(video.uri);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { handleRecord, isPending };
}
