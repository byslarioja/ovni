import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LogoutIcon } from "Components/Icon";
import { Loader } from "Components/Loader";
import RequestPermissions from "Components/RequestPermissions";
import useAuth from "Screens/Auth/useAuth";
import { usePermissions } from "Shared/hooks/usePermissions";
import { Routes } from "Shared/routes";
import Theme from "Shared/theme";
import { translation } from "Shared/translation";
import { translate } from "Shared/utils/translate";
import { Redirect, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
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
            headerRight: () => <LogoutButton />,
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

const LogoutButton = () => {
  const { logout, isLogedOut } = useAuth();

  if (isLogedOut) {
    return <Redirect href={Routes.Login} />;
  }

  return (
    <TouchableOpacity onPress={() => logout()} style={{ padding: 10 }}>
      <LogoutIcon size={24} color={Theme.color.text.light} />
    </TouchableOpacity>
  );
};

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
