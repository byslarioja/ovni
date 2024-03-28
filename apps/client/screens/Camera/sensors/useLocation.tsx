import * as Location from "expo-location";
import { useQuery } from "@tanstack/react-query";

const GPS_REFETCH_INTERVAL = Number(process.env.EXPO_PUBLIC_GPS_INTERVAL);

const getLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    console.error("Permission not granted");
    return;
  }

  const location = await Location.getCurrentPositionAsync({});

  return location;
};

export default function useGPS() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["location"],
    queryFn: getLocation,
    refetchInterval: GPS_REFETCH_INTERVAL,
  });

  return {
    coords: data?.coords,
    speed: data?.coords.speed,
    altitude: data?.coords.altitude,
    isPending,
    isError,
  };
}
