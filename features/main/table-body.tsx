import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getDaftarNamaLain, getDaftarNamaLainBySearch } from "./get-data";
import { PopoverEditNamaMurid } from "./popover-edit-nama-murid";
import { getDaftarNamaMuridBySearch } from "./get-data";
import { SearchParams } from "@/app/page";
import { connection } from "next/server";
export async function MainTableBodyComponent({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  await connection();

  const params = await searchParams;
  const data = await getDaftarNamaLainBySearch(params.q);
  const muridList = await getDaftarNamaMuridBySearch(params.search);
  return (
    <TableBody>
      {data.map((namaLain, index) => (
        <TableRow key={namaLain.id + namaLain.kelas + index}>
          <TableCell>{namaLain.nama_lain}</TableCell>
          <TableCell>{namaLain.kelas}</TableCell>
          <TableCell>
            <PopoverEditNamaMurid
              muridList={muridList}
              namaLainId={namaLain.id}
              namaMurid={namaLain.daftar_nama_murid?.name || null}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
