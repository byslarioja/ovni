import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { TypographyProps } from "../types";
import { Text } from "react-native";
import Theme from "Shared/theme";

export const Label = ({
  children,
  transform = "none",
  customStyle,
}: TypographyProps) => {
  const [fontsLoaded] = useFonts({ Poppins_400Regular });
  if (!fontsLoaded) return null;

  return (
    <Text
      selectable={false}
      style={{
        textTransform: transform,
        color: Theme.color.text.light,
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        ...customStyle,
      }}
    >
      {children}
    </Text>
  );
};
