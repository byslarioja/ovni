import { PersistedAsset } from "Screens/Camera/services/types";
import { useStorageState } from "Shared/hooks/useStorageState";

export function useAssetVideoList() {
  const [[isLoading, assets]] = useStorageState<PersistedAsset[]>("videos");

  return {
    assets: assets ?? [],
    isLoading,
  };
}
