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
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.country}</TableCell>
            <TableCell>
              <BanUser userId={user.id} userEmail={user.email} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
