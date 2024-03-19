import { translate } from "Shared/utils/translate";
import { Asset } from "expo-media-library";
import { translation } from "./translation";

const BASE_URI = `${process.env.EXPO_PUBLIC_API_URL}`;

type VideoInfo = {
  hash: string;
  asset: Asset;
};

const lang = translate(translation);

export async function uploadVideoInfo(videoInfo: VideoInfo, token) {
  const response = await fetch(`${BASE_URI}/upload-video-info`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(videoInfo),
  });

  if (!response.ok) {
    throw new Error(`${lang.t("CAMERA_SERVICE.ERROR")} ${response.status}`);
  }

  return await response.json();
}
