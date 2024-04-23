import { useBanUser } from "./useBanUser";
import { Destroy } from "@/components/destroy";
import { BanIcon } from "lucide-react";

export function BanUser({
  userId,
  userEmail,
}: {
  userId: string;
  userEmail: string;
}) {
  const { handleDeletion, isPending } = useBanUser();

  return (
    <Destroy
      handleDestroy={() => handleDeletion(userId)}
      isPending={isPending}
      icon={<BanIcon />}
    >
      Esta acción no puede deshacerse. Esto eliminará los datos de{" "}
      <span className="font-bold"> {userEmail}</span> de la base de datos.
    </Destroy>
  );
}
