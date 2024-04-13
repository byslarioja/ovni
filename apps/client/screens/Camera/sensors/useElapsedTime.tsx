import { atom, useAtomValue } from "jotai";
import { useQuery } from "@tanstack/react-query";
import { getElapsedTime } from "../services/time.service";

export const useElapsedTime = () => {
  const startTime = useAtomValue(startTimeAtom);

  const { data } = useQuery({
    queryKey: ["elapsed-time"],
    queryFn: () => getElapsedTime(startTime),
    refetchInterval: 500,
  });

  return { elapsedTime: data };
};

export const startTimeAtom = atom(0);
export const endTimeAtom = atom(0);
