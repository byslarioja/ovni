import * as MediaLibrary from "expo-media-library";
import { MutableRefObject, useEffect } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { Camera } from "expo-camera";
import { endTimeAtom, startTimeAtom } from "../sensors/useTime";
import { createHash } from "../services/video.service";
import { resetSensorsAtom } from "../sensors/useResetSensors";
import { useUpload } from "./useUpload";
import { readingsAtom } from "../sensors/useReadings";
import appConfig from "../../../app.json";
import { useSession } from "Shared/contexts/session.context";
import { AssetStatus, PersistedAsset } from "../services/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const recordingAtom = atom(false);

const handleRecordingAtom = atom(null, (_, set, update: boolean) => {
  if (update) {
    set(startTimeAtom, Date.now());
  } else {
    set(endTimeAtom, Date.now());
  }

  set(recordingAtom, update);
});

export function useRecording(cameraRef: MutableRefObject<Camera | null>) {
  const isRecording = useAtomValue(recordingAtom);
  const setRecording = useSetAtom(handleRecordingAtom);
  const resetSensorReadings = useSetAtom(resetSensorsAtom);

  const readings = useAtomValue(readingsAtom);
  const startTime = useAtomValue(startTimeAtom);
  const endTime = useAtomValue(endTimeAtom);
  const { session } = useSession();

  const { handleUpload, isPending } = useUpload();

  useEffect(() => {
    resetSensorReadings();
  }, []);

  const saveVideo = async (uri: string) => {
    //create asset
    const asset = await MediaLibrary.createAssetAsync(uri);

    //create hash
    const hash = await createHash(
      `${asset.creationTime}${asset.modificationTime}`
    );

    //upload asset and hash to api
    if (session) {
      handleUpload({
        payload: {
          hash,
          start: startTime,
          end: endTime,
          appVersion: appConfig.expo.version,
          asset,
          readings,
        },
        token: session,
      });
    }

    //save asset to localstorage
    const persistedAssets = await AsyncStorage.getItem("videos");
    const assets: PersistedAsset[] = persistedAssets
      ? JSON.parse(persistedAssets)
      : [];

    const newPersistedAssets = [
      ...assets,
      { ...asset, status: AssetStatus.Pending },
    ];

    await AsyncStorage.setItem("videos", JSON.stringify(newPersistedAssets));
  };

  const handleRecord = async () => {
    if (!cameraRef.current) return;

    try {
      if (isRecording) {
        setRecording(false);
        await cameraRef.current.stopRecording();
      } else {
        setRecording(true);
        const video = await cameraRef.current.recordAsync({
          quality: "720p",
        });
        saveVideo(video.uri);
        resetSensorReadings();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { handleRecord, isPending };
}
