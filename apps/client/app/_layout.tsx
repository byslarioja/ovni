import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LogoutIcon } from "Components/Icon";
import useAuth from "Screens/Auth/useAuth";
import Theme from "Shared/theme";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient();

export default function AppLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Theme.color.scheme.black["900"] },
          headerTintColor: Theme.color.text.light,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          contentStyle: { backgroundColor: Theme.color.neutral.background },
        }}
      >
        <Stack.Screen name={"index"} options={{ ...defaultScreenOptions }} />
        <Stack.Screen name={"register"} options={{ ...defaultScreenOptions }} />
        <Stack.Screen
          name={"(app)/forgot-password"}
          options={{ ...defaultScreenOptions }}
        />
        <Stack.Screen
          name={"(app)/reset-password"}
          options={{ ...defaultScreenOptions }}
        />
        <Stack.Screen
          name={"(app)/library"}
          options={{
            ...defaultScreenOptions,
            headerShown: true,
            title: "Recorded videos",
            headerRight: () => (
              <TouchableOpacity
                onPress={useAuth().logout}
                style={{ padding: 10 }}
              >
                <LogoutIcon size={24} color={Theme.color.text.light} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name={"(app)/camera"}
          options={{
            ...defaultScreenOptions,
            orientation: "landscape",
            statusBarHidden: true,
          }}
        />
      </Stack>
      <Toast />
    </QueryClientProvider>
  );
}

const defaultScreenOptions = {
  headerShown: false,
  statusBarTranslucent: true,
  orientation: "portrait" as
    | "default"
    | "all"
    | "portrait"
    | "portrait_up"
    | "portrait_down"
    | "landscape"
    | "landscape_left"
    | "landscape_right",
};
