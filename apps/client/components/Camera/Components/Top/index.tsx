import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AlertIcon, GaleryIcon, LogoutIcon, MenuIcon } from "../../../Icon";
import Constants from "expo-constants";
import { useState } from "react";

export default function Top() {
  const [menu, setMenu] = useState(false);

  return (
    <View style={styles.top}>
      <TouchableOpacity style={[styles.topButton, styles.centerItem]}>
        <AlertIcon size={20} color="#f2f2f2" />
      </TouchableOpacity>
      <View style={styles.rec}>
        <View style={[styles.recDot, styles.centerItem]} />
        <Text style={[styles.itemColor, styles.centerItem]}>00:01:24:01</Text>
      </View>
      <View style={[styles.topButton, styles.topMenu]}>
        {menu ? (
          <View style={[styles.menuButton, styles.centerItem]}>
            <TouchableOpacity>
              <GaleryIcon size={24} color="#f2f2f2" />
            </TouchableOpacity>
            <TouchableOpacity>
              <LogoutIcon size={24} color="#f2f2f2" />
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
        <TouchableOpacity
          style={styles.topButton}
          onPress={() => setMenu(!menu)}
        >
          <MenuIcon size={20} color="#f2f2f2" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    backgroundColor: "transparent",
    paddingLeft: 35,
    paddingRight: 35,
    paddingBottom: 3,
    justifyContent: "space-between",
  },
  topButton: {
    backgroundColor: "rgba(54, 54, 54, 0.5)",
    borderColor: "rgba(242, 242, 242, .25)",
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
  },
  topMenu: {
    flexDirection: "row",
    padding: 0,
  },
  menuButton: {
    marginLeft: 10,
    marginRight: 10,
    gap: 10,
    flexDirection: "row",
  },
  rec: {
    flexDirection: "row",
    gap: 5,
  },
  recDot: {
    backgroundColor: "#E83F3F",
    height: 8,
    width: 8,
    borderRadius: 50,
  },
  centerItem: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  itemColor: { color: "#f2f2f2" },
});
