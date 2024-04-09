import AsyncStorage from "@react-native-async-storage/async-storage";
import * as MediaLibrary from "expo-media-library";
import useAuth from "Screens/Auth/useAuth";
import { MutableRefObject, useEffect } from "react";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { Camera } from "expo-camera";
import { useMutation } from "@tanstack/react-query";
import { endTimeAtom, startTimeAtom } from "./sensors/useElapsedTime";
import { deviceRotationReadingsAtom } from "./sensors/useDeviceRotation";
import { climateReadingsAtom } from "./sensors/useClimate";
import { GPSReadingsAtom } from "./sensors/useGPS";
import { magnetometerReadingsAtom } from "./sensors/useMagnetometer";
import {
  createHash,
  uploadVideoInfo,
  onError,
  onSuccess,
} from "./services/video.service";
import {
  readingsWithinVideoLength,
  refineClimate,
  refineGPS,
  refineOrientation,
  refineRotation,
} from "./services/sensor.service";
import { expo as app } from "../../app.json";
import { resetSensorsAtom } from "./sensors/useResetSensors";

export const recordingAtom = atom(false);

export function useRecording(cameraRef: MutableRefObject<Camera>) {
  const { token } = useAuth();
  const [isRecording, setIsRecording] = useAtom(recordingAtom);
  const resetSensorReadings = useSetAtom(resetSensorsAtom);

  const [startTime, setStartTime] = useAtom(startTimeAtom);
  const [endTime, setEndTime] = useAtom(endTimeAtom);
  const rotation = useAtomValue(deviceRotationReadingsAtom);
  const climate = useAtomValue(climateReadingsAtom);
  const gps = useAtomValue(GPSReadingsAtom);
  const orientation = useAtomValue(magnetometerReadingsAtom);

  const { mutate } = useMutation({
    mutationFn: uploadVideoInfo,
    onError,
    onSuccess,
    onSettled: resetSensorReadings,
  });

  const getReadings = () => {
    return {
      rotation: rotation
        .filter(refineRotation)
        .filter(
          (reading, index, readings) =>
            index === readings.length - 1 ||
            readingsWithinVideoLength(reading, startTime, endTime)
        ),
      climate: climate
        .filter(refineClimate)
        .filter(
          (reading, index, readings) =>
            index === readings.length - 1 ||
            readingsWithinVideoLength(reading, startTime, endTime)
        ),
      gps: gps
        .filter(refineGPS)
        .filter(
          (reading, index, readings) =>
            index === readings.length - 1 ||
            readingsWithinVideoLength(reading, startTime, endTime)
        ),
      orientation: orientation
        .filter(refineOrientation)
        .filter(
          (reading, index, readings) =>
            index === readings.length - 1 ||
            readingsWithinVideoLength(reading, startTime, endTime)
        ),
    };
  };

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
    const readings = getReadings();
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
        setIsRecording(true);
        const video = await cameraRef.current.recordAsync();
        saveVideo(video.uri);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { handleRecord };
}
