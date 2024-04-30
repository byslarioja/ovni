import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Loader } from "Components/Loader";
import { LogoutButton } from "Components/LogoutButton";
import RequestPermissions from "Components/RequestPermissions";
import { usePermissions } from "Shared/hooks/usePermissions";
import Theme from "Shared/theme";
import { translation } from "Shared/translation";
import { translate } from "Shared/utils/translate";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient();
const lang = translate(translation);

export default function AppLayout() {
  const { isPending, permissions } = usePermissions();
  const granted = permissions.reduce(
    (granted, permission) => permission.status?.granted && granted,
    true
  );

  if (isPending) {
    return <Loader text={lang.t("PERMISSIONS.LOADING")} />;
  }
  if (!granted) {
    return <RequestPermissions permissions={permissions} />;
  }

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
          name={"forgot-password"}
          options={{ ...defaultScreenOptions }}
        />
        <Stack.Screen
          name={"reset-password/[token]"}
          options={{ ...defaultScreenOptions }}
        />
        <Stack.Screen
          name={"(app)/library"}
          options={{
            ...defaultScreenOptions,
            headerShown: true,
            title: "Recorded videos",
            headerRight: () => <LogoutButton style={{ padding: 10 }} />,
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
