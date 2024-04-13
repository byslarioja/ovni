import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "firebase.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadVideoInfo, onError, onSuccess } from "./services/video.service";
import { resetSensorsAtom, resetTimeAtom } from "./sensors/useResetSensors";
import { useAtomValue, useSetAtom } from "jotai";
import { readingsAtom } from "./sensors/useReadings";
import { endTimeAtom, startTimeAtom } from "./sensors/useElapsedTime";
import useAuth from "Screens/Auth/useAuth";
import { Asset } from "expo-media-library";
import appConfig from "../../app.json";
import { useState } from "react";

export const useUpload = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const resetSensorReadings = useSetAtom(resetSensorsAtom);
  const resetTime = useSetAtom(resetTimeAtom);
  const readings = useAtomValue(readingsAtom);
  const startTime = useAtomValue(startTimeAtom);
  const endTime = useAtomValue(endTimeAtom);

  const { mutate, isPending } = useMutation({
    mutationFn: uploadVideoInfo,
    onError,
    onSuccess,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
      resetSensorReadings();
      setProgress(0);
      resetTime();
    },
  });

  const handleUpload = async ({
    asset,
    hash,
  }: {
    asset: Asset;
    hash: string;
  }) => {
    const videoResponse = await fetch(asset.uri);
    const blob = await videoResponse.blob();

    const storageRef = ref(storage, `videos/${hash}${asset.filename}`);

    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setIsUploading(true);
        setProgress(
          Math.round((snapshot.bytesTransferred * 100) / snapshot.totalBytes)
        );
      },
      (error) => console.error(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const payload = {
            payload: {
              uri: downloadURL,
              hash,
              start: startTime,
              end: endTime,
              appVersion: appConfig.expo.version,
              asset,
              readings,
            },
            token,
          };
          setIsUploading(false);

          mutate(payload);
        });
      }
    );
  };

  return { handleUpload, isPending, isUploading, progress };
};
