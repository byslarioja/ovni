import { ActivityIndicator, View } from "react-native";

export function ThumbnailLoader({
  thumbnailWidth,
}: {
  thumbnailWidth: number;
}) {
  return (
    <View
      style={{
        height: thumbnailWidth * 0.75,
        width: thumbnailWidth,
        backgroundColor: "rgba(54, 54, 54, .5)",
        justifyContent: "center",
        borderRadius: 5,
      }}
    >
      <ActivityIndicator color="white" />
    </View>
  );
}
