import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function WelcomeScreen() {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        gap: 5,
        padding: 50,
      }}
    >
      <View
        style={{
          backgroundColor: "red",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Link href={"auth/login"} style={{ padding: 50 }}>
          <Text>Login</Text>
        </Link>
      </View>
      <View
        style={{
          backgroundColor: "red",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Link href={"camera"} style={{ padding: 50 }}>
          <Text>Camera</Text>
        </Link>
      </View>
    </View>
  );
}
