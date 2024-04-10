import SideNavbar from "@/components/SideNavbar";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import "../globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

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
        <TanStackRouterDevtools />
      </QueryClientProvider>
    </TooltipProvider>
  ),
});
