import { Text, TouchableOpacity, View } from "react-native";
import { AlertIcon, GaleryIcon, MenuIcon } from "Components/Icon";
import { useState } from "react";
import { styles } from "./styles";
import Theme from "Shared/theme";
import { router } from "expo-router";
import { Routes } from "Shared/routes";
import { useElapsedTime } from "Screens/Camera/hooks/useElapsedTime";
import { LogoutButton } from "Components/LogoutButton";

export default function TopBar() {
  const [menu, setMenu] = useState(false);
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
            <LogoutButton />
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
