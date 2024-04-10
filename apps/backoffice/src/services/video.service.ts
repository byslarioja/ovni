import { ApiVideoResponse } from "@/types/api";
import axios from "axios";

const BASE_URI = import.meta.env.VITE_API_URL;

export const getVideos = async (): Promise<ApiVideoResponse> => {
  const response = await axios.get(`${BASE_URI}/videos`);

  return response.data;
};
