import { useNavigate } from "@tanstack/react-router";
import { Button } from "./ui/button";

export const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 grid place-items-center bg-background">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-5 text-primary">
          Página no encontrada
        </h2>
        <Button onClick={() => navigate({ to: "/" })} className="mt-5">
          Ir a inicio
        </Button>
      </div>
    </div>
  );
};
