import { Loader } from "Components/Loader";
import { LogoutButton } from "Components/LogoutButton";
import { useSession } from "Shared/contexts/session.context";
import { Routes } from "Shared/routes";
import Theme from "Shared/theme";
import { translation } from "Shared/translation";
import { translate } from "Shared/utils/translate";
import { Redirect, Stack } from "expo-router";

const lang = translate(translation);

export default function AppLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Loader text={lang.t("STATE.CHECKING_CREDENTIALS")} />;
  }

  if (!session) {
    return <Redirect href={Routes.SignIn} />;
  }

  return (
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
      <Stack.Screen
        name={"index"}
        options={{
          orientation: "landscape",
          headerShown: false,
          statusBarHidden: true,
        }}
      />

      <Stack.Screen
        name={"library"}
        options={{
          orientation: "portrait",
          statusBarTranslucent: true,
          headerShown: true,
          title: lang.t("PAGE_TITLE.LIBRARY"),
          headerRight: () => <LogoutButton style={{ padding: 10 }} />,
        }}
      />
    </Stack>
  );
}
