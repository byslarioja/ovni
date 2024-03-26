import SideNavbar from "@/components/SideNavbar";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import "../globals.css";

export const Route = createRootRoute({
  component: () => (
    <TooltipProvider>
      <div className="flex h-screen">
        <SideNavbar />
        <div className="w-full h-full flex flex-col p-16">
          <Outlet />
        </div>
      </div>
    </TooltipProvider>
  ),
});
