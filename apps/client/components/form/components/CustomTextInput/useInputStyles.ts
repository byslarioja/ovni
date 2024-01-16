import { ReactNode, useState } from "react";
import { styles } from "./styles";
import { ViewStyle } from "react-native";
import { Noop } from "react-hook-form";
import Theme from "../../../../shared/theme";

export default function useInputStyles(
  isInvalid: boolean,
  isDisabled: boolean,
  rightIcon: ReactNode,
  lines: number
) {
  let stylesInput: Array<ViewStyle> = [styles.input];
  let stylesInputSection: Array<ViewStyle> = [styles.inputSection];
  let colorText = Theme.color.text.placeholder;

  const stylesIconRight = styles.iconRight;

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = (onBlur: Noop) => {
    onBlur();
    setIsFocused(false);
  };

  if (rightIcon) {
    stylesInput = [...stylesInput, styles.inputIconRight];
  }
  if (lines > 1) {
    stylesInputSection = [styles.inputSection, styles.textareaSection];
    stylesInput = [styles.input, styles.textarea];
  }
  if (isInvalid) {
    colorText = Theme.color.text.light;
    stylesInput = [...stylesInput, styles.invalid];
  }
  if (isDisabled) {
    colorText = Theme.color.text.disabled;
    stylesInput = [...stylesInput, styles.disabled];
  }

  return {
    stylesInput,
    colorText,
    stylesInputSection,
    isFocused,
    handleFocus,
    handleBlur,
    stylesIconRight,
  };
}
