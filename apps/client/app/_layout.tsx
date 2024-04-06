import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useOrientation } from "Shared/hooks/useOrientation";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient();

export default function AppLayout() {
  const { unLockOrientation } = useOrientation();

  useEffect(() => {
    unLockOrientation();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <Slot />
      <Toast />
    </QueryClientProvider>
  );
}
