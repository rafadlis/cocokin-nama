"use server";

import { DaftarNamaMuridTable } from "@/lib/drizzle/schema";
import { serverConnection } from "@/lib/drizzle/server";
import { eq } from "drizzle-orm";

export async function updateNamaLainMurid(muridId: number, namaLainId: number) {
  const db = await serverConnection();
  await db
    .update(DaftarNamaMuridTable)
    .set({ nama_lain_id: namaLainId })
    .where(eq(DaftarNamaMuridTable.id, muridId));
}
