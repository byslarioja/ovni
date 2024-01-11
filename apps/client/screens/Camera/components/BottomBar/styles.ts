import { StyleSheet } from "react-native";
import Theme from "../../../../shared/theme";

export const styles = StyleSheet.create({
  bottom: {
    flexDirection: "row",
    paddingLeft: 45,
    paddingRight: 50,
    paddingBottom: 20,
    justifyContent: "space-between",
  },
  bottomItem: {
    flexDirection: "row",
  },
  itemColor: {
    color: Theme.color.button.neutral,
  },
});
