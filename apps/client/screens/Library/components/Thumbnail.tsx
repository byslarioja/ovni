import {
  Image,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import * as VideoThumbnails from "expo-video-thumbnails";
import { useEffect, useState } from "react";
import { ThumbnailLoader } from "./ThumbnailLoader";
import { PersistedAsset } from "Screens/Camera/services/types";
import { StatusIndicator } from "./StatusIndicator";

export function Thumbnail({ asset }: { asset: PersistedAsset }) {
  const { width, height } = useWindowDimensions();
  const [image, setImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const col_number = width > height ? 5 : 3;
  const thumbnailWidth = width / col_number - 20;

  useEffect(() => {
    (async () => {
      try {
        const { uri } = await VideoThumbnails.getThumbnailAsync(asset.uri);
        setImage(uri);
        setIsLoading(false);
      } catch (e) {
        console.warn(e);
      }
    })();
  }, []);

  if (isLoading) {
    return <ThumbnailLoader thumbnailWidth={thumbnailWidth} />;
  }

  return (
    <TouchableOpacity onPress={() => setModalVisible(true)}>
      <Image
        style={{
          width: thumbnailWidth,
          height: thumbnailWidth * 0.75,
          borderRadius: 5,
          position: "relative",
        }}
        source={{
          uri: image,
        }}
      />

      <View
        style={{
          position: "absolute",
          bottom: -2,
          right: -2,
          width: 24,
          height: 24,
        }}
      >
        <StatusIndicator status={asset.status} />
      </View>
    </TouchableOpacity>
  );
}
