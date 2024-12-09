"use server";

import { DaftarNamaMuridTable } from "@/drizzle/schema";
import { serverConnection } from "@/drizzle/server";
import { eq } from "drizzle-orm";

export async function updateNamaLainMurid(muridId: number, namaLainId: number) {
  const db = await serverConnection();
  const result = await db
    .update(DaftarNamaMuridTable)
    .set({ nama_lain_id: namaLainId })
    .where(eq(DaftarNamaMuridTable.id, muridId))
    .returning({ nama_lain_id: DaftarNamaMuridTable.nama_lain_id });
  if (result.length === 0) {
    throw new Error("Failed to update nama lain murid");
  }
  return result[0];
}
