import Theme from "Shared/theme";
import { ActivityIndicator, View } from "react-native";

export function ThumbnailLoader({ thumbnailWidth }) {
  return (
    <View
      style={{
        height: thumbnailWidth * 0.75,
        width: thumbnailWidth,
        backgroundColor: Theme.color.states.info.normal,
        justifyContent: "center",
        borderRadius: 5,
      }}
    >
      <ActivityIndicator />
    </View>
  );
}
