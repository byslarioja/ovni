import { Title } from "Components/Typography";
import { Routes } from "Shared/routes";
import { Link } from "expo-router";

export default function ForgotPassword() {
  return (
    <>
      <Title customStyle={{ color: "white" }}>ForgotPassword</Title>
      <Link href={Routes.SignIn}>back to login</Link>
    </>
  );
}
