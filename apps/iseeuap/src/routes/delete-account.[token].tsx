import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/delete-account/[token]")({
  component: () => <div>Hello /delete-account/[token]!</div>,
});
