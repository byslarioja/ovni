import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Loader } from "Components/Loader";
import RequestPermissions from "Components/RequestPermissions";
import { SessionProvider } from "Shared/contexts/session.context";
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
      <SessionProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: Theme.color.scheme.black["900"] },
            headerTintColor: Theme.color.text.light,
            headerTitleStyle: {
              fontWeight: "bold",
            },
            contentStyle: { backgroundColor: Theme.color.scheme.black["900"] },
            headerShown: false,
            statusBarColor: Theme.color.scheme.black["900"],
          }}
        />
        <Toast />
      </SessionProvider>
    </QueryClientProvider>
  );
}
