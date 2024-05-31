import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: Layout,
});

function Layout() {
  return <Outlet />;
}
