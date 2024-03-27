import { useMutation, useQueryClient } from "@tanstack/react-query";

const BASE_URI = import.meta.env.VITE_API_URL;

export async function banUser(id: string) {
  const res = await fetch(`${BASE_URI}/users/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Algo salió mal, reintente nuevamente.");
  }
}

/**
 * TODO: invalidateQueries doesn't work.
 * Mutation remains pending even after making changes in the server.
 */
export const useBanUser = () => {
  const { isPending, mutate } = useMutation({
    mutationFn: banUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const queryClient = useQueryClient();
  const onDelete = (id: string) => mutate(id);

  return { handleDeletion: onDelete, isPending };
};
