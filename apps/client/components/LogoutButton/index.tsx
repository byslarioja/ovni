import { LogoutIcon } from "Components/Icon";
import { useSession } from "Shared/contexts/session.context";
import Theme from "Shared/theme";
import { translate } from "Shared/utils/translate";
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
  const { signOut } = useSession();

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
          onPress: signOut,
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
