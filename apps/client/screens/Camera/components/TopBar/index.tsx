import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  AlertIcon,
  GaleryIcon,
  LogoutIcon,
  MenuIcon,
} from "../../../../components/Icon";
import { useState } from "react";
import { styles } from "./styles";

export default function TopBar() {
  const [menu, setMenu] = useState(false);
  const iconColor = "#f2f2f2";

  return (
    <View style={styles.top}>
      <TouchableOpacity style={[styles.topButton, styles.centerItem]}>
        <AlertIcon size={20} color={iconColor} />
      </TouchableOpacity>
      <View style={styles.rec}>
        <View style={[styles.recDot, styles.centerItem]} />
        <Text style={[styles.itemColor, styles.centerItem]}>00:01:24:01</Text>
      </View>
      <View style={[styles.topButton, styles.topMenu]}>
        {menu ? (
          <View style={[styles.menuButton, styles.centerItem]}>
            <TouchableOpacity>
              <GaleryIcon size={24} color={iconColor} />
            </TouchableOpacity>
            <TouchableOpacity>
              <LogoutIcon size={24} color={iconColor} />
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
        <TouchableOpacity
          style={styles.topButton}
          onPress={() => setMenu(!menu)}
        >
          <MenuIcon size={20} color={iconColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
