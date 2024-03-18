import Theme from "Shared/theme";
import { ActivityIndicator, View } from "react-native";
import { style } from "./styles";

export function LoaderButton() {
  return (
    <View style={style.background}>
      <ActivityIndicator color={Theme.color.text.light} />
    </View>
  );
}
