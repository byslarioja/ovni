import SideNavbar from "@/components/SideNavbar";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import "../globals.css";
import React, { Suspense } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient } from "@tanstack/react-query";
import { Breadcrumbs } from "@/features/Breadcrumbs";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  title: string;
}>()({
  component: () => (
    <TooltipProvider>
      <div className="flex h-screen bg-background">
        <SideNavbar />
        <div className="w-full h-full flex flex-col p-16">
          <Breadcrumbs />
          <Outlet />
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
      <Suspense>
        <TanStackRouterDevtoolsProduction />
      </Suspense>
    </TooltipProvider>
  ),
});

const TanStackRouterDevtoolsProduction =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );
