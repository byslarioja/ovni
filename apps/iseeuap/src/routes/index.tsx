import { createFileRoute } from "@tanstack/react-router";

//Acá va la landing
export const Route = createFileRoute("/")({
  component: () => <div>Hello /!</div>,
});
