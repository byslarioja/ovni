import { PersistedAsset } from "Screens/Camera/services/types";
import { atom } from "jotai";

export const showAssetAtom = atom<PersistedAsset | null>(null);
