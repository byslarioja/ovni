import { LogoutIcon } from "Components/Icon";
import useAuth from "Screens/Auth/useAuth";
import { Routes } from "Shared/routes";
import Theme from "Shared/theme";
import { translate } from "Shared/utils/translate";
import { Redirect } from "expo-router";
import { Alert, TouchableOpacity, TouchableOpacityProps } from "react-native";

const lang = translate({
  en: {
    TITLE: "Sign out",
    MESSAGE: "Are you sure you want to sign out?",
    BUTTON: {
      CONFIRM: "Sign out",
      CANCEL: "Cancel",
    },
  },
  es: {
    TITLE: "Cerrar sesión",
    MESSAGE: "¿Estás seguro que deseas cerrar sesión?",
    BUTTON: {
      CONFIRM: "Cerrar sesión",
      CANCEL: "Cancelar",
    },
  },
});

export const LogoutButton = (props: TouchableOpacityProps) => {
  const { logout, isLogedOut } = useAuth();

  if (isLogedOut) {
    return <Redirect href={Routes.Login} />;
  }

  const attemptLogout = () => {
    const title = lang.t("TITLE");
    const message = lang.t("MESSAGE");
    const confirm = lang.t("BUTTON.CONFIRM");
    const cancel = lang.t("BUTTON.CANCEL");

    Alert.alert(
      title,
      message,
      [
        {
          text: confirm,
          onPress: () => logout(),
          style: "destructive",
        },
        { text: cancel, style: "cancel", isPreferred: true },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <TouchableOpacity onPress={attemptLogout} {...props}>
      <LogoutIcon size={24} color={Theme.color.text.light} />
    </TouchableOpacity>
  );
};
