import SideNavbar from "@/components/SideNavbar";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import "../globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CatchBoundary } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <CatchBoundary
      errorComponent={ErrorPage}
      getResetKey={() => "reset"}
      onCatch={(error) => console.info(error)}
    >
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          <div className="flex h-screen">
            <SideNavbar />
            <div className="w-full h-full flex flex-col p-16">
              <Outlet />
            </div>
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </TooltipProvider>
    </CatchBoundary>
  ),
});

type Error = {
  name: string;
  message: string;
};

const ErrorPage = ({ error }: { error: Error }) => {
  return (
    <div className="absolute inset-0 grid place-items-center bg-slate-800">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-5 text-red-500">
          {error.name}
        </h2>
        <p className="text-white">{error.message}</p>
      </div>
    </div>
  );
};
