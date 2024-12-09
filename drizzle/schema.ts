import { pgTable, varchar, serial, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
export const NamaLainTable = pgTable("nama_lain", {
  id: serial("id").primaryKey(),
  nama_lain: varchar("nama_lain", { length: 255 }).notNull(),
  kelas: varchar("kelas", { length: 255 }).notNull(),
});

export const DaftarNamaMuridTable = pgTable("daftar_nama_murid", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  kelas: varchar("kelas", { length: 255 }).notNull(),
  nomor_absen: varchar("nomor_absen", { length: 255 }).notNull(),
  nama_lain_id: integer("nama_lain_id").references(() => NamaLainTable.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
});

export const NilaiTable = pgTable("nilai", {
  id: serial("id").primaryKey(),
  benar: integer("benar").notNull(),
  nama_lain_id: integer("nama_lain_id").references(() => NamaLainTable.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
});

export const NamaLainTableRelations = relations(NamaLainTable, ({ one }) => ({
  nilai: one(NilaiTable, {
    fields: [NamaLainTable.id],
    references: [NilaiTable.nama_lain_id],
  }),
  daftar_nama_murid: one(DaftarNamaMuridTable),
}));

export const NilaiTableRelations = relations(NilaiTable, ({ one }) => ({
  nama_lain: one(NamaLainTable, {
    fields: [NilaiTable.nama_lain_id],
    references: [NamaLainTable.id],
  }),
}));
