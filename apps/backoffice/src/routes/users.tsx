import { createFileRoute } from "@tanstack/react-router";

import { PageTitle } from "@/components/PageTitle";
import UsersList from "@/features/users-list";

export const Route = createFileRoute("/users")({
  component: UsersPage,
});

function UsersPage() {
  return (
    <>
      <PageTitle>Usuarios</PageTitle>
      <UsersList />
    </>
  );
}
