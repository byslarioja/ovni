import { ReactNode } from "react";
import { KeyboardType } from "react-native";

export type CustomTextInputProps = {
  placeholder?: string;
  label?: string;
  keyboardType?: KeyboardType;
  rightIcon?: ReactNode;
};
