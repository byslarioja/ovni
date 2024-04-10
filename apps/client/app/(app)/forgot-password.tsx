import { Button } from "Components/Button";
import { Title } from "Components/Typography";
import { Routes } from "Shared/routes";
import { router } from "expo-router";

export default function ForgotPassword() {
  return (
    <>
      <Title customStyle={{ color: "white" }}>ForgotPassword</Title>
      <Button
        onPress={() => router.navigate(Routes.Login)}
        text="back to login"
      />
    </>
  );
}
