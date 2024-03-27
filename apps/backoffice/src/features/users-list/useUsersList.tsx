import { useQuery } from "@tanstack/react-query";

const BASE_URI = import.meta.env.VITE_API_URL;

async function getUsers(): Promise<User[]> {
  const res = await fetch(`${BASE_URI}/users`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Algo salió mal, reintente nuevamente.");
  }
  const response = await res.json();

  return response;
}

export const useUsersList = () => {
  const { data, error, isError, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isError) throw new Error(`${error.message}`);

  return { users: data, isPending };
};

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  zip_code: string;
  youtube_channel: string;
};
