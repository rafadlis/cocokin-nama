"use client";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getDaftarNamaMurid } from "./get-data";
import useSWR from "swr";
import { updateNamaLainMurid } from "./edit-data";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function EditPopover({ namaLainId }: { namaLainId: number }) {
  //   get data nama murid
  const { data: namaMurid } = useSWR(
    "/api/daftar-nama-murid",
    getDaftarNamaMurid,
    {
      refreshInterval: 1000,
    }
  );

  //   handle update nama lain murid
  const router = useRouter();
  const handleUpdateNamaLainMurid = async (muridId: number) => {
    await updateNamaLainMurid(namaLainId, muridId);
    router.refresh();
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link">Klik untuk edit</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Input placeholder="Cari murid" />
        <div className="overflow-y-auto max-h-[300px] divide-y">
          {namaMurid?.map((murid) => (
            <div
              key={murid.id}
              onClick={() => handleUpdateNamaLainMurid(murid.id)}
              className="p-2 hover:bg-muted cursor-pointer"
            >
              {murid.name}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
