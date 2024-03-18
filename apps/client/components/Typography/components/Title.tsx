import { Poppins_700Bold, useFonts } from "@expo-google-fonts/poppins";
import { TypographyProps } from "../types";
import { Text } from "react-native";
import Theme from "Shared/theme";

export const Title = ({
  children,
  transform = "none",
  customStyle,
}: TypographyProps) => {
  const [fontsLoaded] = useFonts({ Poppins_700Bold });
  if (!fontsLoaded) return null;

  return (
    <Text
      selectable={false}
      style={{
        textTransform: transform,
        color: Theme.color.text.light,
        fontSize: 19,
        fontFamily: "Poppins_700Bold",
        ...customStyle,
      }}
    >
      {children}
    </Text>
  );
};
