import { Link } from "expo-router";
import { View } from "react-native";
import { VideoCameraIcon } from "./VideoCameraIcon";
import Theme from "Shared/theme";
import { Routes } from "Shared/routes";

export function FloatingActionButton() {
  return (
    <Link
      href={Routes.Camera}
      style={{
        position: "absolute",
        bottom: 40,
        right: 20,
      }}
    >
      <View
        style={{
          borderColor: "rgba(242, 242, 242, .1)",
          borderRadius: 50,
          borderWidth: 2,
          backgroundColor: "rgba(54, 54, 54, 1)",
          width: 60,
          height: 60,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <VideoCameraIcon size={30} color={Theme.color.text.light} />
      </View>
    </Link>
  );
}
