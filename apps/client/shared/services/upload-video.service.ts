import AsyncStorage from "@react-native-async-storage/async-storage";
import { AssetStatus, PersistedAsset } from "Screens/Camera/services/types";
import {
  checkIntegrity,
  createHash,
  uploadVideoURI,
} from "Screens/Camera/services/video.service";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "firebase.config";
import { BackgroundFetchResult } from "expo-background-fetch";

const ASSETS_KEY = "assets";
const SESSION_KEY = "session";
const VIDEO_PATH = "videos";

export async function UploadTask() {
  const [assets, hasPendings, uploadable] = await getPendingAssets();

  if (!hasPendings) return BackgroundFetchResult.NoData;

  const token = (await AsyncStorage.getItem(SESSION_KEY)) ?? null;

  if (!token) {
    return BackgroundFetchResult.NoData;
  }

  const hash = await createHash(
    `${uploadable.creationTime}${uploadable.modificationTime}`
  );

  const wasModified = await checkIntegrity({ hash, token });
  if (wasModified) {
    await setAssetStatus(assets, AssetStatus.Rejected, uploadable);

    return BackgroundFetchResult.Failed;
  }

  try {
    const blob = await getAssetBlob(uploadable.uri);

    const uri = await uploadToStorage(blob, hash, uploadable);

    const [status] = await uploadVideoURI({ uri, hash, token });

    if (status !== 204) {
      await setAssetStatus(assets, AssetStatus.Rejected, uploadable);

      return BackgroundFetchResult.Failed;
    }

    await setAssetStatus(assets, AssetStatus.Uploaded, uploadable);

    return BackgroundFetchResult.NewData;
  } catch (error) {
    return BackgroundFetchResult.Failed;
  }
}

async function setAssetStatus(
  assets: PersistedAsset[],
  status: AssetStatus,
  target: PersistedAsset
) {
  const newPersistedAssets = [
    ...assets.filter((asset) => asset.id !== target.id),
    { ...target, status },
  ];

  await AsyncStorage.setItem(ASSETS_KEY, JSON.stringify(newPersistedAssets));
}

async function getPendingAssets(): Promise<
  [PersistedAsset[], boolean, PersistedAsset]
> {
  const persistedAssets = await AsyncStorage.getItem(ASSETS_KEY);
  const assets: PersistedAsset[] = persistedAssets
    ? JSON.parse(persistedAssets)
    : [];

  const hasAssetsPending = assets.length > 0;

  const pendingAssets = assets.filter(
    (asset) => asset.status === AssetStatus.Pending
  );

  return [pendingAssets, hasAssetsPending, pendingAssets[0]];
}

async function getAssetBlob(uri: string) {
  const videoResponse = await fetch(uri);
  return await videoResponse.blob();
}

async function uploadToStorage(
  blob: Blob,
  hash: string,
  uploadable: PersistedAsset
) {
  const storageRef = ref(
    storage,
    `${VIDEO_PATH}/${hash}${uploadable.filename}`
  );
  const snapshot = await uploadBytesResumable(storageRef, blob);
  return await getDownloadURL(snapshot.ref);
}
