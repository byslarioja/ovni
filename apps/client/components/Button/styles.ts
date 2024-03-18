import Theme from "Shared/theme";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  background: {
    alignContent: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 5,
    backgroundColor: Theme.color.button.primary,
  },
});
