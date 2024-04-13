import { Text, TouchableOpacity, View } from "react-native";
import { AlertIcon, GaleryIcon, LogoutIcon, MenuIcon } from "Components/Icon";
import { useState } from "react";
import { styles } from "./styles";
import Theme from "Shared/theme";
import useAuth from "Screens/Auth/useAuth";
import { router } from "expo-router";
import { useElapsedTime } from "Screens/Camera/sensors/useElapsedTime";
import { Routes } from "Shared/routes";

export default function TopBar() {
  const [menu, setMenu] = useState(false);
  const { logout } = useAuth();
  const { elapsedTime } = useElapsedTime();

  return (
    <View style={styles.top}>
      <TouchableOpacity style={[styles.topButton, styles.centerItem]}>
        <AlertIcon size={20} color={Theme.color.button.neutral} />
      </TouchableOpacity>
      <View style={styles.rec}>
        <View style={[styles.recDot, styles.centerItem]} />
        <Text style={[styles.itemColor, styles.centerItem]}>{elapsedTime}</Text>
      </View>
      <View style={[styles.topButton, styles.topMenu]}>
        {menu ? (
          <View style={[styles.menuButton, styles.centerItem]}>
            <TouchableOpacity onPress={() => router.navigate(Routes.Library)}>
              <GaleryIcon size={24} color={Theme.color.button.neutral} />
            </TouchableOpacity>
            <TouchableOpacity onPress={logout}>
              <LogoutIcon size={24} color={Theme.color.button.neutral} />
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
        <TouchableOpacity
          style={styles.topButton}
          onPress={() => setMenu(!menu)}
        >
          <MenuIcon size={20} color={Theme.color.button.neutral} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
