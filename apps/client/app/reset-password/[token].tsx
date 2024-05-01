import { Label, Title } from "Components/Typography";
import { Routes } from "Shared/routes";
import { Link, useLocalSearchParams } from "expo-router";

export default function ResetPassword() {
  const { token } = useLocalSearchParams<Record<string, string>>();

  return (
    <>
      <Title customStyle={{ color: "white" }}>ResetPassword</Title>
      <Label>{token}</Label>
      <Link href={Routes.SignIn}>back to login</Link>
    </>
  );
}
