import { StyleSheet } from "react-native";
import Theme from "../../../../shared/theme";

export const styles = StyleSheet.create({
  label: {
    color: Theme.color.text.light,
  },
  inputSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  textareaSection: {
    height: 125,
  },
  textarea: {
    height: 120,
    textAlignVertical: "top",
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
  invalid: {
    backgroundColor: Theme.color.states.danger.normal,
    borderColor: Theme.color.states.danger.normal,
    color: Theme.color.text.light,
  },
  disabled: {
    backgroundColor: Theme.color.neutral.background,
    borderColor: Theme.color.neutral.border,
    color: Theme.color.text.disabled,
  },
  container: {
    justifyContent: "flex-start",
  },
});
