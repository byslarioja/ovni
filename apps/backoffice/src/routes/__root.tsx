import SideNavbar from "@/components/SideNavbar";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import "../globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <TooltipProvider>
      <QueryClientProvider client={queryClient}>
        <div className="flex h-screen">
          <SideNavbar />
          <div className="w-full h-full flex flex-col p-16">
            <Outlet />
          </div>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
        <Suspense>
          <TanStackRouterDevtoolsProduction />
        </Suspense>
      </QueryClientProvider>
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
