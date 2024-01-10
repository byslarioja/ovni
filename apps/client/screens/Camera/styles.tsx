import { StyleSheet } from "react-native";
import Constants from "expo-constants";

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
  recOffButton: {
    height: 75,
    width: 75,
    borderColor: "#f2f2f2",
    borderRadius: 100,
    borderWidth: 5,
    marginLeft: "auto",
  },
  recOnButton: {
    height: 75,
    width: 75,
    backgroundColor: "#f2f2f2",
    borderRadius: 100,
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
    color: "#F2F2F2",
    textAlign: "right",
  },
});
