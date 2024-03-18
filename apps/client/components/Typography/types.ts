import { PropsWithChildren } from "react";
import { TextStyle } from "react-native";

export interface TypographyProps extends PropsWithChildren {
  transform?: "none" | "uppercase" | "lowercase" | "capitalize";
  customStyle?: TextStyle;
}
