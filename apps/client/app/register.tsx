import { Title } from "Components/Typography";
import { Routes } from "Shared/routes";
import { Link } from "expo-router";

export default function Page() {
  return (
    <>
      <Title customStyle={{ color: "white" }}>Register</Title>
      <Link href={Routes.SignIn}>back to login</Link>
    </>
  );
}
