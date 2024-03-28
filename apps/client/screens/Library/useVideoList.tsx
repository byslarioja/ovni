import { useQuery } from "@tanstack/react-query";
import * as MediaLibrary from "expo-media-library";

export function useAssetVideoList() {
  const { data, isLoading } = useQuery({
    queryKey: ["assets"],
    queryFn: getAssetInfo,
  });
  return {
    assets: data,
    isLoading,
  };
}

const getAssetInfo = async () => {
  const { assets } = await MediaLibrary.getAssetsAsync({
    mediaType: "video",
  });

  return assets;
};
