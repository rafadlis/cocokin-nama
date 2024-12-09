"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { DaftarNamaMuridTable } from "@/lib/drizzle/schema";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { updateNamaLainMurid } from "./edit-data";
import { toast } from "sonner";
import { useState } from "react";

export function PopoverEditNamaMurid({
  muridList,
  namaLainId,
  namaMurid,
}: {
  muridList: (typeof DaftarNamaMuridTable.$inferSelect)[];
  namaLainId: number;
  namaMurid: string | null | undefined;
}) {
  // get existing search params
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  const router = useRouter();
  const debouncedSearch = useDebouncedCallback((value: string) => {
    router.push(`?${q ? `q=${q}&` : ""}search=${value}`, { scroll: false });
  }, 300);

  async function updateNamaLainMuridAction(
    muridId: number,
    namaLainId: number
  ) {
    toast.promise(updateNamaLainMurid(muridId, namaLainId), {
      loading: "Mengubah nama murid...",
      success: () => {
        router.push(`?${q ? `q=${q}&` : ""}search=`, { scroll: false });
        router.refresh();
        setOpen(false);
        return "Nama murid berhasil diubah";
      },
      error: "Nama murid gagal diubah",
    });
  }

  //   const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 2000));

  // toast.promise(promise, {
  //   loading: 'Loading...',
  //   success: (data) => {
  //     return `${data.name} toast has been added`;
  //   },
  //   error: 'Error',
  // });

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
        <ScrollArea className="h-[200px]">
          {muridList.map((murid) => (
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
          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
