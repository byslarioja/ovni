import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUsersList } from "./useUsersList";
import { Spinner } from "@/components/Spinner";
import { BanUser } from "../ban-user";

export default function UsersList() {
  const { users, isPending } = useUsersList();

  if (isPending) {
    return (
      <div className="grid place-content-center h-full">
        <Spinner size={32} />
      </div>
    );
  }

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
        {users?.map((user) => (
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
