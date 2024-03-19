import { Asset } from "expo-media-library";

const BASE_URI = `${process.env.EXPO_PUBLIC_API_URL}`;

type VideoInfo = {
  hash: `${string}-${string}-${string}-${string}-${string}`;
  asset: Asset;
};

export async function uploadVideoInfo(videoInfo: VideoInfo) {
  const response = await fetch(`${BASE_URI}/upload-video-info`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(videoInfo),
  });

  return await response.json();
}
