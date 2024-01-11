import { useEffect, useState } from "react";

export function useCamera() {
  const [zoom, setZoom] = useState(0);
  const [rec, setRec] = useState(false);
  const [clock, setClock] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setClock(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    zoom,
    setZoom,
    rec,
    setRec,
    clock,
  };
}
