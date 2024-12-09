import { Table, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { MainTableBodyComponent } from "@/features/main/table-body";
import { Suspense } from "react";
import { TableBodySkeleton } from "@/components/table-skeleteon";
import { SearchNamaLainComponent } from "@/features/main/search-nama-lain";

export type SearchParams = Promise<{
  search?: string | null | undefined;
  q?: string | null | undefined;
}>;

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <main className="container mx-auto py-10 space-y-4">
      <h1 className="text-2xl font-bold">Pencocokan Nama</h1>
      <SearchNamaLainComponent />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Quizziz</TableHead>
              <TableHead>Kelas</TableHead>
              <TableHead>Nama Asli Murid</TableHead>
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
