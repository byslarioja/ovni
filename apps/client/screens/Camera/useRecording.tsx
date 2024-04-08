import { translate } from "Shared/utils/translate";
import { Asset } from "expo-media-library";
import { translation } from "./translation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import * as MediaLibrary from "expo-media-library";
import useAuth from "Screens/Auth/useAuth";
import { MutableRefObject, useCallback } from "react";
import { atom, useAtom, useAtomValue } from "jotai";
import { Camera } from "expo-camera";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import {
  ClimateReadings,
  GPSReading,
  MagnetometerReading,
  RotationReading,
  TimeReading,
} from "./sensors/types";
import { endTimeAtom, startTimeAtom } from "./sensors/useElapsedTime";
import { expo as app } from "../../app.json";
import { deviceRotationReadingsAtom } from "./sensors/useDeviceRotation";
import { climateReadingsAtom } from "./sensors/useClimate";
import { GPSReadingsAtom } from "./sensors/useGPS";
import { magnetometerReadingsAtom } from "./sensors/useMagnetometer";

const BASE_URI = `${process.env.EXPO_PUBLIC_API_URL}`;
const lang = translate(translation);

export const recordingAtom = atom(false);

export function useRecording(cameraRef: MutableRefObject<Camera>) {
  const { token } = useAuth();
  const [isRecording, setIsRecording] = useAtom(recordingAtom);

  const { mutate } = useMutation({
    mutationFn: ({
      videoInfo,
      token,
    }: {
      videoInfo: VideoInfo;
      token: string;
    }) => uploadVideoInfo(videoInfo, token),
  });

  const startTime = useAtomValue(startTimeAtom);
  const endTime = useAtomValue(endTimeAtom);
  const rotation = useAtomValue(deviceRotationReadingsAtom);
  const climate = useAtomValue(climateReadingsAtom);
  const gps = useAtomValue(GPSReadingsAtom);
  const orientation = useAtomValue(magnetometerReadingsAtom);

  const getReadings = () => {
    return {
      start: startTime,
      end: endTime,
      appVersion: app.version,
      rotation,
      climate,
      gps,
      orientation,
    };
  };

  const saveVideo = useCallback(
    async (uri: string) => {
      try {
        const asset = await MediaLibrary.createAssetAsync(uri);
        //asset.creationTime and asset.modificationTime
        const hash = await createHash(
          `${asset.creationTime}${asset.modificationTime}`
        );
        const readings = getReadings();

        await AsyncStorage.setItem(hash, JSON.stringify(asset));
        mutate({ videoInfo: { hash, asset, readings }, token });

        router.navigate("/");
        Toast.show({
          type: "success",
          text1: lang.t("MESSAGES.SAVED"),
        });
      } catch (error) {
        console.error(error);
      }
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

const createHash = async (stringToHash: string) => {
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    stringToHash
  );
  return hash;
};

async function uploadVideoInfo(videoInfo: VideoInfo, token: string) {
  const response = await fetch(`${BASE_URI}/video/video-info`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(videoInfo),
  });

  if (!response.ok) {
    throw new Error(`${lang.t("CAMERA_SERVICE.ERROR")} ${response.status}`);
  }
}

type VideoInfo = {
  hash: string;
  asset: Asset;
  readings: Readings;
};

type Readings = {
  start: TimeReading;
  end: TimeReading;
  appVersion: string;
  rotation: RotationReading[];
  climate: ClimateReadings[];
  gps: GPSReading[];
  orientation: MagnetometerReading[];
};
