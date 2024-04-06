import { Title } from "Components/Typography";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  View,
  useWindowDimensions,
} from "react-native";
import { Thumbnail } from "./components/Thumbnail";
import { translate } from "Shared/utils/translate";
import { translation } from "./translation";
import Theme from "Shared/theme";
import { FloatingActionButton } from "./components/FloatingActionButton";
import { useAssetVideoList } from "./useVideoList";

export default function Library() {
  const lang = translate(translation);
  const { width, height } = useWindowDimensions();
  const { assets, isLoading } = useAssetVideoList();

  return (
    <View
      style={{
        backgroundColor: Theme.color.neutral.background,
        height: "100%",
        padding: 20,
        paddingBottom: 0,
      }}
    >
      <SafeAreaView
        style={{
          width: width,
        }}
      >
        <Title customStyle={{ paddingBottom: 20, paddingVertical: 30 }}>
          {lang.t("GALLERY_TITLE")}
        </Title>
        {!isLoading ? (
          <FlatList
            key={width}
            contentContainerStyle={{
              gap: 10,
              paddingBottom: (width / 5 - 20) * 0.75, //extra empty row at the bottom
            }}
            columnWrapperStyle={{ gap: 10 }}
            data={assets}
            numColumns={width > height ? 5 : 3}
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
      </SafeAreaView>
      <FloatingActionButton />
    </View>
  );
}
