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
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { updateNamaLainMurid } from "./edit-data";
export function PopoverEditNamaMurid({
  muridList,
  namaLainId,
  namaMurid,
}: {
  muridList: (typeof DaftarNamaMuridTable.$inferSelect)[];
  namaLainId: number;
  namaMurid: string | null | undefined;
}) {
  const router = useRouter();
  const debouncedSearch = useDebouncedCallback((value: string) => {
    router.push(`?search=${value}`);
  }, 300);
  async function updateNamaLainMuridAction(
    namaLainId: number,
    muridId: number
  ) {
    await updateNamaLainMurid(namaLainId, muridId);
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link" onClick={() => debouncedSearch("")}>
          {namaMurid ?? "Klik untuk edit nama"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        <Input
          placeholder="Cari nama..."
          onChange={(e) => debouncedSearch(e.target.value)}
        />
        <ScrollArea className="h-[200px]">
          {muridList.map((murid) => (
            <form
              key={murid.id}
              action={() => updateNamaLainMuridAction(namaLainId, murid.id)}
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
