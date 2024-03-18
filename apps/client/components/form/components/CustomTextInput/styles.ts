import Theme from "Shared/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  inputSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 44,
    borderColor: Theme.color.neutral.border,
    borderWidth: 1,
    borderRadius: 5,
    includeFontPadding: false,
    backgroundColor: "#E0E0E0",
  },
  inputIconRight: {
    paddingRight: 40,
  },
  iconRight: {
    minWidth: 24,
    maxWidth: 70,
    height: 24,
    position: "absolute",
    textAlign: "right",
    right: 10,
  },
  container: {
    justifyContent: "flex-start",
  },
});
