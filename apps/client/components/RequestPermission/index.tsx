import { Button, StyleSheet, View, Text } from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";

export default function RequestPermission({
  title,
  requestPermission,
}: RequestPermission) {
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center" }}>{title}</Text>
      <Button onPress={requestPermission} title="grant permission" />
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
});

type RequestPermission = {
  title: string;
  requestPermission: () => void;
};
