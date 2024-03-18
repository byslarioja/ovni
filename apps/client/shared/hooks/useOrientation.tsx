import { useEffect } from "react";
import { OrientationLock, lockAsync } from "expo-screen-orientation";

export function useOrientation() {
  const lockOrientation = (orientation: OrientationLock) => {
    useEffect(() => {
      async function changeScreenOrientation() {
        await lockAsync(orientation);
      }

      changeScreenOrientation();
    }, []);
  };

  return { lockOrientation };
}
