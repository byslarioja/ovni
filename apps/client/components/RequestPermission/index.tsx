import { StyleSheet, View, Text } from "react-native";
import Theme from "Shared/theme";
import { Button } from "Components/Button";

export default function RequestPermission({
  title,
  description,
  requestPermission,
}: RequestPermission) {
  const onPermissionRequest = () => {
    requestPermission();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.subtitle}>{description}</Text>}
      <Button onPress={onPermissionRequest} text="grant permission" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: "10%",
    gap: 20,
    backgroundColor: Theme.color.neutral.background,
  },
  title: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
    color: "#888",
    fontSize: 18,
    marginBottom: 20,
  },
});

type RequestPermission = {
  title: string;
  description?: string;
  requestPermission: () => void;
};
