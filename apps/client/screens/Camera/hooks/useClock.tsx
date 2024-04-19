import { useQuery } from "@tanstack/react-query";
import { formatDate } from "Shared/utils/time";
import { useRef } from "react";

function createClock() {
  const startTime = Date.now();
  return () => {
    return formatDate(startTime);
  };
}

export function useClock() {
  const clockRef = useRef(createClock());
  const { data: clock } = useQuery({
    queryKey: ["clock"],
    queryFn: clockRef.current,
    refetchInterval: 30_000,
  });

  return clock;
}
