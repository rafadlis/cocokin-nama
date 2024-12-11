"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { updateNamaLainMurid } from "./edit-data";
import { toast } from "sonner";
import { useState } from "react";
import { getDaftarNamaMuridBySearch } from "./get-data";
import useSWR from "swr";
export function PopoverEditNamaMurid({
  namaLainId,
  namaMurid,
}: {
  namaLainId: number;
  namaMurid: string | null | undefined;
}) {
  // get existing search params
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  // fetching data
  const [searchQuery, setSearchQuery] = useState(q || null);
  const { data: muridList, isLoading } = useSWR(
    searchQuery ? `?q=${searchQuery}&search=${searchQuery}` : null,
    () => getDaftarNamaMuridBySearch(searchQuery)
  );

  const router = useRouter();
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
  }, 600);

  async function updateNamaLainMuridAction(
    muridId: number,
    namaLainId: number
  ) {
    toast.promise(updateNamaLainMurid(muridId, namaLainId), {
      loading: "Mengubah nama murid...",
      success: () => {
        router.push(`?${q ? `q=${q}&` : ""}`, { scroll: false });
        router.refresh();
        setOpen(false);
        return "Nama murid berhasil diubah";
      },
      error: "Nama murid gagal diubah",
    });
  }

  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="text-left hover:underline">
        {namaMurid ?? (
          <span className="text-muted-foreground">Klik untuk edit nama</span>
        )}
      </PopoverTrigger>
      <PopoverContent
        className="flex flex-col gap-2"
        side="bottom"
        align="start"
      >
        <Input
          placeholder="Cari nama..."
          onChange={(e) => debouncedSearch(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Setelah mengetik, tunggu sebentar untuk melihat hasilnya, jika tidak
          ada hasilnya, maka nama murid tidak ditemukan
        </p>
        <ScrollArea className="h-[200px]">
          {isLoading ? (
            <p className="text-muted-foreground">Mencari...</p>
          ) : searchQuery == null ? null : muridList?.length ? (
            muridList.map((murid) => (
              <form
                key={murid.id}
                action={() => updateNamaLainMuridAction(murid.id, namaLainId)}
                className="w-full"
              >
                <Button
                  type="submit"
                  variant="link"
                  className="px-0 line-clamp-1"
                >
                  {murid.name}
                </Button>
              </form>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              Tidak ada hasil untuk <code>{searchQuery}</code>
            </p>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
