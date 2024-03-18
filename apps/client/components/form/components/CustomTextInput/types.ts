import { ReactNode } from "react";
import { Noop } from "react-hook-form";
import { KeyboardType } from "react-native";

export type CustomTextInputProps = {
  placeholder?: string;
  label?: string;
  keyboardType?: KeyboardType;
  rightIcon?: ReactNode;
  onBlur?: Noop;
  onChangeText?: () => void;
  value?: string;
  isPassword?: boolean;
  error?: string;
};
