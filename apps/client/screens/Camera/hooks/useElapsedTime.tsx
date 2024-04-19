import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { getElapsedTime } from "../services/time.service";
import { startTimeAtom } from "../sensors/useTime";
import { recordingAtom } from "./useRecording";

export const useElapsedTime = () => {
  const startTime = useAtomValue(startTimeAtom);
  const isRecording = useAtomValue(recordingAtom);

  const { data } = useQuery({
    queryKey: ["elapsed-time"],
    queryFn: () => getElapsedTime(startTime * Number(isRecording)),
    refetchInterval: 500,
  });

  return { elapsedTime: data };
};
