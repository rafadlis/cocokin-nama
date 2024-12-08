"use client";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";

import useSWR from "swr";
import { getDaftarNamaLain } from "./get-data";
import EditPopover from "./table-edit-popover";
import { Skeleton } from "@/components/ui/skeleton";

export default function MainTableBodyComponent() {
  const { data, error, isLoading } = useSWR(
    "/api/daftar-nama-murid",
    getDaftarNamaLain,
    {
      refreshInterval: 1000,
    }
  );
  if (error) {
    return (
      <TableRow>
        <TableCell>Error</TableCell>
      </TableRow>
    );
  }
  if (isLoading) {
    return (
      <TableRow>
        <TableCell>
          <Skeleton className="h-4 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-full" />
        </TableCell>
      </TableRow>
    );
  }
  return (
    <TableBody>
      {data &&
        data?.map((namaLain) => (
          <TableRow key={namaLain.id}>
            <TableCell>{namaLain.nama_lain}</TableCell>
            <TableCell>{namaLain.kelas}</TableCell>
            <TableCell>
              <EditPopover namaLainId={namaLain.id} />
            </TableCell>
          </TableRow>
        ))}
    </TableBody>
  );
}
