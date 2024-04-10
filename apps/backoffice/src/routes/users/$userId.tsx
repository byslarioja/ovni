import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/PageTitle";
import { getUser } from "@/services/user.service";

export const Route = createFileRoute("/users/$userId")({
  component: UserPage,
  loader: ({ params: { userId } }) => getUser(userId),
});

function UserPage() {
  const { user } = Route.useLoaderData();

  return (
    <>
      <PageTitle>Usuarios</PageTitle>
      {user.id}
    </>
  );
}
