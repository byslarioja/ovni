import { banUser } from "@/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBanUser = () => {
  const { isPending, mutate } = useMutation({
    mutationFn: banUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const queryClient = useQueryClient();
  const onDelete = (id: string) => mutate(id);

  return { handleDeletion: onDelete, isPending };
};
