import { Button } from "Components/Button";
import { Label, Title } from "Components/Typography";
import { Routes } from "Shared/routes";
import { router, useLocalSearchParams } from "expo-router";

export default function ResetPassword() {
  const { token } = useLocalSearchParams<Record<string, string>>();

  return (
    <>
      <Title customStyle={{ color: "white" }}>ResetPassword</Title>
      <Label>{token}</Label>
      <Button
        onPress={() => router.navigate(Routes.Login)}
        text="back to login"
      />
    </>
  );
}
