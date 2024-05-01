import Theme from "Shared/theme";
import { ActivityIndicator, View } from "react-native";
import { styles } from "./styles";

export function LoaderButton() {
  return (
    <View style={styles.button}>
      <ActivityIndicator color={Theme.color.text.dark} />
    </View>
  );
}
