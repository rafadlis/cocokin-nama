import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MainTableBodyComponent from "./table-body";

export default function MainTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama Lain</TableHead>
          <TableHead>Kelas</TableHead>
          <TableHead>Nama Lengkap</TableHead>
        </TableRow>
      </TableHeader>
      <MainTableBodyComponent />
    </Table>
  );
}
