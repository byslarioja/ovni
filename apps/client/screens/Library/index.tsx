import {
  FlatList,
  SafeAreaView,
  View,
  useWindowDimensions,
} from "react-native";
import { Thumbnail } from "./components/Thumbnail";
import { FloatingActionButton } from "./components/FloatingActionButton";
import { useAssetVideoList } from "./useVideoList";
import { Loader } from "Components/Loader";
import { useAtom } from "jotai";
import { showAssetAtom } from "./useShowAsset";
import { VideoInfo } from "./components/VideoInfo";
import { Drawer } from "Components/Drawer";

export default function Library() {
  const { width, height } = useWindowDimensions();
  const { assets, isLoading } = useAssetVideoList();

  const [showableAsset, setShowableAsset] = useAtom(showAssetAtom);

  return (
    <View
      style={{
        height: "100%",
      }}
    >
      <SafeAreaView style={{ width: width }}>
        {!isLoading ? (
          <FlatList
            key={width}
            contentContainerStyle={{
              height: "100%",
              paddingHorizontal: 20,
              paddingVertical: 20,
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
          <Loader />
        )}
      </SafeAreaView>

      {showableAsset ? (
        <Drawer onClose={() => setShowableAsset(null)}>
          <VideoInfo asset={showableAsset} />
        </Drawer>
      ) : (
        <FloatingActionButton />
      )}
    </View>
  );
}
