import { getCurrentPositionAsync } from "expo-location";

export const getLocation = async () => {
  return await getCurrentPositionAsync();
};
