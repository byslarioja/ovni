import AsyncStorage from "@react-native-async-storage/async-storage";
import * as MediaLibrary from "expo-media-library";
import useAuth from "Screens/Auth/useAuth";
import { MutableRefObject, useCallback } from "react";
import { atom, useAtom, useAtomValue } from "jotai";
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

export const recordingAtom = atom(false);

export function useRecording(cameraRef: MutableRefObject<Camera>) {
  const { token } = useAuth();
  const [isRecording, setIsRecording] = useAtom(recordingAtom);

  const { mutate } = useMutation({
    mutationFn: uploadVideoInfo,
    onError,
    onSuccess,
  });

  const startTime = useAtomValue(startTimeAtom);
  const endTime = useAtomValue(endTimeAtom);
  const rotation = useAtomValue(deviceRotationReadingsAtom);
  const climate = useAtomValue(climateReadingsAtom);
  const gps = useAtomValue(GPSReadingsAtom);
  const orientation = useAtomValue(magnetometerReadingsAtom);

  const getReadings = () => {
    const gpsReadings = gps
      .filter(refineGPS)
      .filter(
        (reading, index, readings) =>
          index === readings.length - 1 ||
          readingsWithinVideoLength(reading, startTime, endTime)
      );
    const climateReadings = climate
      .filter(refineClimate)
      .filter(
        (reading, index, readings) =>
          index === readings.length - 1 ||
          readingsWithinVideoLength(reading, startTime, endTime)
      );
    const orientationReadings = orientation
      .filter(refineOrientation)
      .filter(
        (reading, index, readings) =>
          index === readings.length - 1 ||
          readingsWithinVideoLength(reading, startTime, endTime)
      );
    const rotationReadings = rotation
      .filter(refineRotation)
      .filter(
        (reading, index, readings) =>
          index === readings.length - 1 ||
          readingsWithinVideoLength(reading, startTime, endTime)
      );

    return {
      start: startTime,
      end: endTime,
      appVersion: app.version,
      readings: {
        rotation: rotationReadings,
        climate: climateReadings,
        gps: gpsReadings,
        orientation: orientationReadings,
      },
    };
  };

  const saveVideo = useCallback(
    async (uri: string) => {
      const asset = await MediaLibrary.createAssetAsync(uri);
      const hash = await createHash(
        `${asset.creationTime}${asset.modificationTime}`
      );
      const readings = getReadings();
      await AsyncStorage.setItem(hash, JSON.stringify(asset));

      mutate({ hash, asset, ...readings, token });
    },
    [token]
  );

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
