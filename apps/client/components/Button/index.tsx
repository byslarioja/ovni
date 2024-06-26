import { Label } from "Components/Typography";
import Theme from "Shared/theme";
import { TouchableHighlight } from "react-native";
import { styles } from "./styles";

type ButtonProps = {
  onPress: () => void;
  text: string;
  capitalize?: boolean;
};

export function Button({ onPress, text, capitalize = false }: ButtonProps) {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={styles.button}
      underlayColor={Theme.color.scheme.black[200]}
    >
      <Label
        customStyle={{
          ...styles.text,
          textTransform: capitalize ? "capitalize" : "none",
        }}
      >
        {text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()}
      </Label>
    </TouchableHighlight>
  );
}
