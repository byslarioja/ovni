import { useQuery } from "@tanstack/react-query";
import * as MediaLibrary from "expo-media-library";

// export function useAssetVideoList() {
//   const { data, isLoading } = useQuery({
//     queryKey: ["assets"],
//     queryFn: getAssetInfo,
//   });
//   return {
//     assets: data,
//     isLoading,
//   };
// }

// const getAssetInfo = async () => {
//   const { assets } = await MediaLibrary.getAssetsAsync({
//     mediaType: MediaLibrary.MediaType.video,
//   });

//   return assets;
// };

import { PersistedAsset } from "Screens/Camera/services/types";
import { useStorageState } from "Shared/hooks/useStorageState";

export function useAssetVideoList() {
  const [[isLoading, assets]] = useStorageState<PersistedAsset[]>("videos");

  return {
    assets,
    isLoading,
  };
}
