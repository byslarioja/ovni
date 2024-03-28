import { translate } from "Shared/utils/translate";
import { Asset } from "expo-media-library";
import { translation } from "./translation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import * as MediaLibrary from "expo-media-library";
import useAuth from "Screens/Auth/useAuth";
import { MutableRefObject, useCallback } from "react";
import { atom, useAtom } from "jotai";
import { Camera } from "expo-camera";

const BASE_URI = `${process.env.EXPO_PUBLIC_API_URL}`;
const lang = translate(translation);

export const recordingAtom = atom(false);

export function useRecording(cameraRef: MutableRefObject<Camera>) {
  const { token } = useAuth();
  const [isRecording, setIsRecording] = useAtom(recordingAtom);

  const saveVideo = useCallback(
    async (uri: string) => {
      try {
        const asset = await MediaLibrary.createAssetAsync(uri);
        const hash = Crypto.randomUUID(); //TODO: this needs to be created from video's content

        await AsyncStorage.setItem(hash, JSON.stringify(asset));
        await uploadVideoInfo({ hash, asset }, token);
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
  return await response.json();
}

type VideoInfo = {
  hash: string;
  asset: Asset;
};
