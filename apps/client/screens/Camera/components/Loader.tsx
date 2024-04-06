import Theme from "Shared/theme";
import { ActivityIndicator, View } from "react-native";

export function Loader() {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        backgroundColor: Theme.color.neutral.background,
      }}
    >
      <ActivityIndicator size={60} color={Theme.color.text.light} />
    </View>
  );
}
