import { PageTitle } from "@/components/PageTitle";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: WelcomePage,
});

function WelcomePage() {
  return (
    <>
      <PageTitle>Inicio</PageTitle>
    </>
  );
}
