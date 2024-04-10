import { Title } from "Components/Typography";
import Theme from "Shared/theme";
import { ActivityIndicator, View } from "react-native";

export function Loader({ text }: { text?: string }) {
  return (
    <View
      style={{
        gap: 20,
        height: "100%",
        justifyContent: "center",
        backgroundColor: Theme.color.neutral.background,
      }}
    >
      <ActivityIndicator size={60} color={Theme.color.text.light} />
      {text && <Title customStyle={{ textAlign: "center" }}>{text}</Title>}
    </View>
  );
}
