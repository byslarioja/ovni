import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AlertIcon, MenuIcon } from "../../../Icon";
import Constants from "expo-constants";

export default function Top() {
  return (
    <View style={styles.top}>
      <TouchableOpacity style={styles.topButtom}>
        <AlertIcon size={20} color="#f2f2f2" />
      </TouchableOpacity>
      <Text style={styles.topTimer}>00:01:24:01</Text>
      <TouchableOpacity style={styles.topButtom}>
        <MenuIcon size={20} color="#f2f2f2" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    backgroundColor: "red",
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 10,
    marginTop: Constants.statusBarHeight,
    justifyContent: "space-between",
  },
  topButtom: {
    backgroundColor: "rgba(54, 54, 54, 0.5)",
    borderRadius: 5,
    padding: 10,
  },
  topTimer: { color: "#f2f2f2", marginTop: "auto", marginBottom: "auto" },
});
