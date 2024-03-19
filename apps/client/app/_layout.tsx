import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AppLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Slot />
    </>
  );
}
