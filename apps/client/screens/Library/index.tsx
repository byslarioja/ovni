import { Title } from "Components/Typography";
import {
  ActivityIndicator,
  FlatList,
  TouchableHighlight,
  View,
} from "react-native";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import { Thumbnail } from "./components/Thumbnail";
import { translate } from "Shared/utils/translate";
import { translation } from "./translation";
import { VideoCameraIcon } from "./components/VideoCameraIcon";
import { router } from "expo-router";
import Theme from "Shared/theme";
import { useOrientation } from "Shared/hooks/useOrientation";
import { OrientationLock } from "expo-screen-orientation";

export default function Library() {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const lang = translate(translation);

  const { lockOrientation } = useOrientation();
  lockOrientation(OrientationLock.PORTRAIT);

  useEffect(() => {
    const listVideos = async () => {
      const { assets } = await MediaLibrary.getAssetsAsync({
        mediaType: "video",
      });
      setAssets(assets);
    };

    listVideos();

    setIsLoading(false);
  }, []);

  return (
    <View
      style={{
        backgroundColor: Theme.color.neutral.background,
        height: "100%",
        padding: 20,
        paddingBottom: 0,
      }}
    >
      <TouchableHighlight
        onPress={() => router.push("camera")}
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          borderRadius: 50,
          padding: 15,
          borderWidth: 2,
          borderColor: "rgba(242, 242, 242, .1)",
          backgroundColor: "rgba(54, 54, 54, 0.5)",
        }}
      >
        <VideoCameraIcon size={40} color={Theme.color.text.light} />
      </TouchableHighlight>
      <View
        style={{
          width: "100%",
        }}
      >
        <Title
          customStyle={{
            paddingVertical: Constants.statusBarHeight,
          }}
        >
          {lang.t("GALLERY_TITLE")}
        </Title>
        {!isLoading ? (
          <FlatList
            contentContainerStyle={{ gap: 10 }}
            columnWrapperStyle={{ gap: 10 }}
            data={assets}
            numColumns={3}
            keyExtractor={(asset) => asset.id}
            renderItem={({ item: asset }) => <Thumbnail asset={asset} />}
          />
        ) : (
          <View
            style={{
              width: "100%",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
    </View>
  );
}
