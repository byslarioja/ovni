import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    backgroundColor: "transparent",
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: Constants.statusBarHeight,
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
