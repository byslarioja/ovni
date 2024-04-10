import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/PageTitle";
import UsersList from "@/features/users-list";
import { getUsers } from "@/services/user.service";

export const Route = createFileRoute("/users/")({
  component: UsersPage,
  loader: getUsers,
});

function UsersPage() {
  const users = Route.useLoaderData();

  return (
    <>
      <PageTitle>Usuarios</PageTitle>
      <UsersList users={users} />
    </>
  );
}
