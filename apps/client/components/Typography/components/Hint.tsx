import { useFonts, Poppins_300Light } from "@expo-google-fonts/poppins";
import { TypographyProps } from "../types";
import { Text } from "react-native";
import Theme from "Shared/theme";

export const Hint = ({
  children,
  transform = "none",
  customStyle,
}: TypographyProps) => {
  const [fontsLoaded] = useFonts({ Poppins_300Light });
  if (!fontsLoaded) return null;

  return (
    <Text
      selectable={false}
      style={{
        textTransform: transform,
        color: Theme.color.text.light,
        fontSize: 12,
        fontFamily: "Poppins_300Light",
        ...customStyle,
      }}
    >
      {children}
    </Text>
  );
};
