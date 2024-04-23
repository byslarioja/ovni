import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/Spinner";
import { ReactElement, ReactNode } from "react";

export function Destroy({
  handleDestroy,
  children,
  isPending,
  icon,
}: {
  handleDestroy: () => void;
  children: ReactNode;
  isPending: boolean;
  icon: ReactElement;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive" size="icon" asChild>
          {icon}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>{children}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDestroy}>
            {isPending ? <Spinner /> : "Sí, estoy seguro"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
