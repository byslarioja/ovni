import { ApiUserResponse, ApiUsersResponse } from "@/types/api";
import axios from "axios";

const BASE_URI = import.meta.env.VITE_API_URL;

export const getUser = async (userId: string): Promise<ApiUserResponse> => {
  const response = await axios.get(`${BASE_URI}/users/${userId}`);

  return response.data;
};

export const getUsers = async (): Promise<ApiUsersResponse> => {
  const response = await axios(`${BASE_URI}/users`);

  return response.data;
};

export async function banUser(id: string) {
  const response = await axios.delete(`${BASE_URI}/users/${id}`);

  return response.data;
}
