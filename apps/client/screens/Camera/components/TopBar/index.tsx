import { Text, TouchableOpacity, View } from "react-native";
import {
  AlertIcon,
  GaleryIcon,
  LogoutIcon,
  MenuIcon,
} from "../../../../components/Icon";
import { useState } from "react";
import { styles } from "./styles";
import Theme from "../../../../shared/theme";

export default function TopBar() {
  const [menu, setMenu] = useState(false);

  return (
    <View style={styles.top}>
      <TouchableOpacity style={[styles.topButton, styles.centerItem]}>
        <AlertIcon size={20} color={Theme.color.button.neutral} />
      </TouchableOpacity>
      <View style={styles.rec}>
        <View style={[styles.recDot, styles.centerItem]} />
        <Text style={[styles.itemColor, styles.centerItem]}>00:01:24:01</Text>
      </View>
      <View style={[styles.topButton, styles.topMenu]}>
        {menu ? (
          <View style={[styles.menuButton, styles.centerItem]}>
            <TouchableOpacity>
              <GaleryIcon size={24} color={Theme.color.button.neutral} />
            </TouchableOpacity>
            <TouchableOpacity>
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