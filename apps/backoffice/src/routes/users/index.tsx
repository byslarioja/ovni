import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/PageTitle";
import UsersList from "@/features/users-list";
import { getUsers } from "@/services/user.service";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

const usersQueryOptions = queryOptions({
  queryKey: ["users"],
  queryFn: getUsers,
});

export const Route = createFileRoute("/users/")({
  component: UsersPage,
  loader: ({ context: { queryClient: QueryClient } }) =>
    QueryClient.ensureQueryData(usersQueryOptions),
});

function UsersPage() {
  const { data: users } = useSuspenseQuery(usersQueryOptions);

  return (
    <>
      <PageTitle>Usuarios</PageTitle>
      <UsersList users={users} />
    </>
  );
}
