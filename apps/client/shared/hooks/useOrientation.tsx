import {
  OrientationLock,
  lockAsync,
  unlockAsync,
} from "expo-screen-orientation";

export function useOrientation() {
  const lockOrientation = async (orientation: OrientationLock) => {
    await lockAsync(orientation);
  };

  const unLockOrientation = async () => {
    await unlockAsync();
  };

  return { lockOrientation, unLockOrientation };
}
