import { pgTable, varchar, serial } from "drizzle-orm/pg-core";

export const DaftarNamaMuridTable = pgTable("daftar_nama_murid", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  kelas: varchar("kelas", { length: 255 }).notNull(),
  nomor_absen: varchar("nomor_absen", { length: 255 }).notNull(),
  nama_lain_id: serial("nama_lain_id").references(() => NamaLainTable.id),
});

export const NamaLainTable = pgTable("nama_lain", {
  id: serial("id").primaryKey(),
  nama_lain: varchar("nama_lain", { length: 255 }).notNull(),
  kelas: varchar("kelas", { length: 255 }).notNull(),
});

export const NilaiTable = pgTable("nilai", {
  id: serial("id").primaryKey(),
  nilai: varchar("nilai", { length: 255 }).notNull(),
  murid_id: serial("murid_id").references(() => DaftarNamaMuridTable.id),
});
