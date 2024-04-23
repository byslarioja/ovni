import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BanUser } from "../ban-user";
import { UsersListProps } from "@/types/props";
import { toTitleCase } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export default function UsersList({ users }: UsersListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>País</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">
              <Link
                to="/users/$userId"
                params={{ userId: user.id }}
                className="font-bold text-blue-800"
              >
                {user.id.split("-")[0]}
              </Link>
            </TableCell>
            <TableCell>{toTitleCase(user.name)}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{toTitleCase(user.country)}</TableCell>
            <TableCell>
              <BanUser userId={user.id} userEmail={user.email} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
