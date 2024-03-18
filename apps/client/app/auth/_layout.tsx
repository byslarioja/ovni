import { useOrientation } from "Shared/hooks/useOrientation";
import Theme from "Shared/theme";
import { Slot } from "expo-router";
import { OrientationLock } from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function AuthLayout() {
  const { lockOrientation } = useOrientation();

  lockOrientation(OrientationLock.PORTRAIT);

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: Theme.color.neutral.background,
        padding: 20,
        height: "100%",
      }}
    >
      <StatusBar style="dark" />
      <Slot />
    </View>
  );
}