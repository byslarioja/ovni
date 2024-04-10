import { useNavigate } from "@tanstack/react-router";
import { Button } from "./ui/button";

export const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 grid place-items-center bg-slate-800">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-5 text-red-500">
          Página no encontrada
        </h2>
        <Button
          onClick={() => navigate({ to: "/users" })}
          variant={"outline"}
          className="mt-5"
        >
          Ir a usuarios
        </Button>
      </div>
    </div>
  );
};
