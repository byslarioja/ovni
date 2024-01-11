import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import Theme from "../../shared/theme";

export const styles = StyleSheet.create({
  camera: {
    height: "100%",
    width: "100%",
  },
  container: {
    paddingTop: Constants.statusBarHeight,
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  center: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    paddingRight: 40,
  },
  slider: {
    width: 200,
    height: 200,
    marginLeft: -50,
    marginTop: "auto",
    marginBottom: "auto",
    transform: [{ rotate: "270deg" }],
  },
  rightSide: {
    backgroundColor: "transparent",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  recButton: {
    height: 75,
    width: 75,
    borderColor: Theme.color.button.neutral,
    borderRadius: 100,
  },
  recOffButton: {
    borderWidth: 5,
    marginLeft: "auto",
  },
  recOnButton: {
    marginLeft: "auto",
    justifyContent: "center",
  },
  recOnCenterButton: {
    height: 20,
    width: 20,
    backgroundColor: "#E83F3F",
    marginLeft: "auto",
    marginRight: "auto",
  },
  text: {
    color: Theme.color.text.light,
    textAlign: "right",
  },
});
