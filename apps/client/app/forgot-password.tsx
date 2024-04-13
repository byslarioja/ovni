import { Button } from "Components/Button";
import { Loader } from "Components/Loader";
import { Title } from "Components/Typography";
import { verifyTokenAtom } from "Screens/Auth/useAuth";
import { Routes } from "Shared/routes";
import { Redirect, router } from "expo-router";
import { useAtomValue } from "jotai";

export default function ForgotPassword() {
  const { isPending: isChecking, data: tokenIsValid } =
    useAtomValue(verifyTokenAtom);

  if (isChecking) {
    return <Loader text="Comprobando credenciales" />;
  }

  if (tokenIsValid) {
    return <Redirect href={Routes.Library} />;
  }

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
