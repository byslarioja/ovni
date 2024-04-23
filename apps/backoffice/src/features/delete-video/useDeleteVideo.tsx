import { deleteVideo } from "@/services/video.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteVideo = () => {
  const { isPending, mutate } = useMutation({
    mutationFn: deleteVideo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["videos"] }),
  });

  const queryClient = useQueryClient();
  const onDelete = (id: string) => mutate(id);

  return { handleDeletion: onDelete, isPending };
};
