import { Button } from "@/components/ui/button";
import { BanIcon } from "lucide-react";
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
import { useBanUser } from "./useBanUser";

export function BanUser({
  userId,
  userEmail,
}: {
  userId: string;
  userEmail: string;
}) {
  const { handleDeletion, isPending } = useBanUser();

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive" size="icon" asChild>
          <BanIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción on puede deshacerse. Esto eliminará los datos de{" "}
            <span className="font-bold"> {userEmail}</span> de la base de datos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeletion(userId)}>
            {isPending ? <Spinner /> : "Sí, estoy seguro"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
