import { useQuery } from "@tanstack/react-query";
import { formatDate } from "Shared/utils/time";
import { useRef } from "react";

function createClock() {
  return () => {
    const startTime = Date.now();
    return startTime;
  };
}

export function useClock() {
  const clockRef = useRef(createClock());
  const { data: clock } = useQuery({
    queryKey: ["clock"],
    queryFn: clockRef.current,
    refetchInterval: 300,
  });

  return formatDate(clock!);
}
