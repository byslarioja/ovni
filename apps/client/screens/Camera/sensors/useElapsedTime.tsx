import { atom, useAtomValue } from "jotai";
import { PrimitiveTimeAtom, TimeReading } from "./types";
import { useRef } from "react";
import { recordingAtom } from "../useRecording";
import { useQuery } from "@tanstack/react-query";

/**
 * TODO: elapsedTimeAtom should depend on startTimeAtom
 */

export const startTimeAtom = atom<TimeReading>(null) as PrimitiveTimeAtom;
export const endTimeAtom = atom<TimeReading>(null) as PrimitiveTimeAtom;

function createTime() {
  const start = Date.now();
  return () => {
    return Date.now() - start;
  };
}

export const useElapsedTime = () => {
  const timerRef = useRef(createTime());
  const start = useAtomValue(startTimeAtom);
  const isRecording = useAtomValue(recordingAtom);

  const { data: elapsedTime } = useQuery({
    queryKey: ["elapsedtime", start],
    queryFn: timerRef.current,
    refetchInterval: 500,
    select: (data) => {
      if (!isRecording) return "00:00:00";

      const totalSeconds = Math.floor((data - start) / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    },
  });

  return elapsedTime;
};
