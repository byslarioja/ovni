import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RedirectToVideosPage,
});

function RedirectToVideosPage() {
  const navigate = useNavigate();
  navigate({ to: "/videos" });
  return <>Look mami</>;
}
