import { ErrorImage } from "Components/ErrorImage";
import Login from "Screens/Auth/Login";
import Theme from "Shared/theme";
import { translate } from "Shared/utils/translate";
import { ErrorBoundaryProps } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Page() {
  return <Login />;
}

export function ErrorBoundary(props: ErrorBoundaryProps) {
  const lang = translate({
    en: {
      TITLE: "Something went wrong",
      RETRY_BUTTON: "Retry?",
    },
    es: {
      TITLE: "Algo salió mal",
      RETRY_BUTTON: "¿Intentar de nuevo?",
    },
  });

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 30 }}>
        <ErrorImage />
      </View>
      <Text style={styles.title}>{lang.t("TITLE")}</Text>
      <Text style={styles.subtitle}>{props.error.message}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{lang.t("RETRY_BUTTON")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.color.neutral.background,
  },
  title: {
    color: "#FFF",
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    color: "#888",
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
  },
});
