import Theme from "Shared/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    backgroundColor: Theme.color.scheme.white[500],
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    minHeight: 45,

    alignItems: "center", // Center text/icon horizontally
    justifyContent: "center", // Center text/icon vertically
  },
  text: {
    color: Theme.color.scheme.black[500],
  },
});
