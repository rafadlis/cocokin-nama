"use server";

import { DaftarNamaMuridTable, NamaLainTable } from "@/lib/drizzle/schema";
import { serverConnection } from "@/lib/drizzle/server";
import { ilike, eq } from "drizzle-orm";
import {
  unstable_cacheTag as cacheTag,
  unstable_cacheLife as cacheLife,
} from "next/cache";

export async function getDaftarNamaMurid() {
  const db = await serverConnection();
  const muridList = await db
    .select({
      id: DaftarNamaMuridTable.id,
      name: DaftarNamaMuridTable.name,
      namaLain: NamaLainTable.nama_lain,
      kelas: NamaLainTable.kelas,
      namaLainId: DaftarNamaMuridTable.nama_lain_id,
    })
    .from(DaftarNamaMuridTable)
    .leftJoin(
      NamaLainTable,
      eq(DaftarNamaMuridTable.nama_lain_id, NamaLainTable.id)
    );
  return muridList;
}

export type DaftarNamaMuridType = Awaited<
  ReturnType<typeof getDaftarNamaMurid>
>;

export async function getDaftarNamaLain() {
  const db = await serverConnection();
  const students = await db.query.NamaLainTable.findMany({
    with: {
      nilai: true,
      daftar_nama_murid: true,
    },
  });
  return students;
}

export async function getDaftarNamaLainBySearch(
  search: string | undefined | null
) {
  const db = await serverConnection();
  if (!search) return getDaftarNamaLain();
  const students = await db.query.NamaLainTable.findMany({
    where: ilike(NamaLainTable.nama_lain, `%${search}%`),
    with: {
      nilai: true,
      daftar_nama_murid: true,
    },
  });
  return students;
}

export type DaftarNamaLainType = Awaited<ReturnType<typeof getDaftarNamaLain>>;

export async function getDaftarNamaMuridBySearch(
  search: string | undefined | null
) {
  "use cache";
  cacheTag(search + "query");
  cacheLife("minutes");
  if (!search) return [];
  const db = await serverConnection();
  const student = await db
    .select()
    .from(DaftarNamaMuridTable)
    .where(ilike(DaftarNamaMuridTable.name, `%${search}%`))
    .limit(10);
  return student;
}

export async function getNamaMuridById(id: number | null) {
  if (!id) return null;
  const db = await serverConnection();
  const student = await db
    .select()
    .from(DaftarNamaMuridTable)
    .where(eq(DaftarNamaMuridTable.id, id));
  return student;
}
