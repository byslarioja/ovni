import { useOrientation } from "Shared/hooks/useOrientation";
import { Slot } from "expo-router";
import { OrientationLock } from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";

export default function AuthLayout() {
  const { lockOrientation } = useOrientation();

  lockOrientation(OrientationLock.LANDSCAPE);

  return (
    <>
      <StatusBar hidden />
      <Slot />
    </>
  );
}
