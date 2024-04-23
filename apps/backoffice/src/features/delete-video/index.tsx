import { Destroy } from "@/components/destroy";
import { useDeleteVideo } from "./useDeleteVideo";
import { Trash } from "lucide-react";

export function DeleteVideo({
  videoId,
  userEmail,
}: {
  videoId: string;
  userEmail: string;
}) {
  const { handleDeletion, isPending } = useDeleteVideo();

  return (
    <Destroy
      handleDestroy={() => handleDeletion(videoId)}
      isPending={isPending}
      icon={<Trash />}
    >
      Esta acción no puede deshacerse. Esto eliminará el vídeo {videoId} de{" "}
      <span className="font-bold"> {userEmail}</span> de la base de datos de
      forma permanente.
    </Destroy>
  );
}
