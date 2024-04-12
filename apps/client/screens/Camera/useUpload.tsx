import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "firebase.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadVideoInfo, onError, onSuccess } from "./services/video.service";
import { resetSensorsAtom } from "./sensors/useResetSensors";
import { useAtomValue, useSetAtom } from "jotai";
import { readingsAtom } from "./sensors/useReadings";
import { endTimeAtom, startTimeAtom } from "./sensors/useElapsedTime";
import useAuth from "Screens/Auth/useAuth";
import { Asset } from "expo-media-library";
import appConfig from "../../app.json";

export const useUpload = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  const resetSensorReadings = useSetAtom(resetSensorsAtom);
  const readings = useAtomValue(readingsAtom);
  const startTime = useAtomValue(startTimeAtom);
  const endTime = useAtomValue(endTimeAtom);

  const { mutate, isPending } = useMutation({
    mutationFn: uploadVideoInfo,
    onError,
    onSuccess,
    onSettled: (data) => {
      console.info(data);
      queryClient.invalidateQueries({ queryKey: ["assets"] });
      resetSensorReadings();
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
        const progress =
          (snapshot.bytesTransferred * 100) / snapshot.totalBytes;
        console.log(progress);
      },
      (error) => console.error(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const start = startTime || asset.creationTime + asset.duration * 1000;
          const end = endTime || asset.creationTime;

          const payload = {
            payload: {
              uri: downloadURL,
              hash,
              start,
              end,
              appVersion: appConfig.expo.version,
              asset,
              readings,
            },
            token,
          };

          mutate(payload);

          console.info(`Link: ${downloadURL}`);
        });
      }
    );
  };

  return { handleUpload, isPending };
};
