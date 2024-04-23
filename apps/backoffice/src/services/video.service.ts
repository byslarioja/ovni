import { ApiVideoResponse } from "@/types/api";
import axios from "axios";

const BASE_URI = import.meta.env.VITE_API_URL;

export const getVideos = async (): Promise<ApiVideoResponse> => {
  const response = await axios.get(`${BASE_URI}/videos`);

  return response.data;
};

export const deleteVideo = async (videoId: string): Promise<void> => {
  return await axios.delete(`${BASE_URI}/videos/${videoId}`);
};
