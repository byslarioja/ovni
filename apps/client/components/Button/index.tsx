import { Title } from "Components/Typography";
import Theme from "Shared/theme";
import { TouchableHighlight } from "react-native";
import { style } from "./styles";

export function Button({ onPress, text }) {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={style.background}
      underlayColor={Theme.color.button.secondary}
    >
      <Title
        transform="uppercase"
        customStyle={{ textAlign: "center", fontSize: 15, fontWeight: "700" }}
      >
        {text}
      </Title>
    </TouchableHighlight>
  );
}
