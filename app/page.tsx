import { Table, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { MainTableBodyComponent } from "@/features/main/table-body";
import { Suspense } from "react";
import { TableBodySkeleton } from "@/components/table-skeleteon";

export type SearchParams = Promise<{
  search?: string;
}>;

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <main className="container mx-auto py-10 space-y-4">
      <h1 className="text-2xl font-bold">Pencocokan Nama</h1>
      <div className="w-full max-w-sm">
        <Input placeholder="Cari murid..." className="w-full" />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Lain</TableHead>
              <TableHead>Kelas</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <Suspense fallback={<TableBodySkeleton />}>
            <MainTableBodyComponent searchParams={searchParams} />
          </Suspense>
        </Table>
      </div>
    </main>
  );
}
