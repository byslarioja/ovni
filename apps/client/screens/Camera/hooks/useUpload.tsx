import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadVideoInfo, onError, onSuccess } from "../services/video.service";
import { resetSensorsAtom } from "../sensors/useResetSensors";
import { useSetAtom } from "jotai";

export const useUpload = () => {
  const queryClient = useQueryClient();

  const resetSensorReadings = useSetAtom(resetSensorsAtom);

  const { mutate, isPending } = useMutation({
    mutationFn: uploadVideoInfo,
    onError,
    onSuccess,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
      resetSensorReadings();
    },
  });

  return { handleUpload: mutate, isPending };
};
