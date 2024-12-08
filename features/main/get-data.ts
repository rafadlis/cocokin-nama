"use server";

import { DaftarNamaMuridTable, NamaLainTable } from "@/lib/drizzle/schema";
import { serverConnection } from "@/lib/drizzle/server";

export async function getDaftarNamaMurid() {
  const db = await serverConnection();
  const students = await db.select().from(DaftarNamaMuridTable);
  return students;
}

export async function getDaftarNamaLain() {
  const db = await serverConnection();
  const students = await db.select().from(NamaLainTable);
  return students;
}
