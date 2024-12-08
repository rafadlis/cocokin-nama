import "dotenv/config";
import { serverConnection } from "./drizzle/server";
import {
  DaftarNamaMuridTable,
  NamaLainTable,
  NilaiTable,
} from "./drizzle/schema";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

// Helper function to read and parse CSV
function readCSV(filePath: string) {
  const fileContent = fs.readFileSync(
    path.join(process.cwd(), filePath),
    "utf-8"
  );
  return parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });
}

// Helper to clean student name without uppercase
function cleanName(name: string) {
  return name.trim().replace(/[^a-zA-Z\s]/g, "");
}

async function main() {
  const db = await serverConnection();

  try {
    // First, insert all students from daftar-murid.csv
    console.log("Inserting students from daftar-murid.csv...");
    const daftarMurid = readCSV("docs/daftar-murid.csv");

    for (const murid of daftarMurid) {
      await db.insert(DaftarNamaMuridTable).values({
        name: cleanName(murid.Nama),
        kelas: murid.Kelas,
        nomor_absen: murid["No. Peserta"],
      });
    }

    // Process UAS results
    console.log("Processing UAS results...");
    const nilaiKelasX = readCSV("docs/hasil_UAS_kelas_X_2024.csv");
    const nilaiKelasXI = readCSV("docs/hasil_UAS_kelas_XI_2024.csv");

    // Process kelas X
    for (const nilai of nilaiKelasX) {
      const namaLengkap = cleanName(
        `${nilai["Nama Depan"]} ${nilai["Nama Belakang"]}`
      );

      // Insert alternative name and get the id
      const [namaLainResult] = await db
        .insert(NamaLainTable)
        .values({
          nama_lain: namaLengkap,
          kelas: "X",
        })
        .returning({ id: NamaLainTable.id });

      // Insert nilai with nama_lain_id reference, using Benar instead of Skor
      await db.insert(NilaiTable).values({
        benar: parseInt(nilai.Benar), // Convert string to integer
        nama_lain_id: namaLainResult.id,
      });
    }

    // Process kelas XI
    for (const nilai of nilaiKelasXI) {
      const namaLengkap = cleanName(
        `${nilai["Nama Depan"]} ${nilai["Nama Belakang"]}`
      );

      // Insert alternative name and get the id
      const [namaLainResult] = await db
        .insert(NamaLainTable)
        .values({
          nama_lain: namaLengkap,
          kelas: "XI",
        })
        .returning({ id: NamaLainTable.id });

      // Insert nilai with nama_lain_id reference, using Benar instead of Skor
      await db.insert(NilaiTable).values({
        benar: parseInt(nilai.Benar), // Convert string to integer
        nama_lain_id: namaLainResult.id,
      });
    }

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
    throw error;
  }
}

main().catch((err) => {
  console.error("Error seeding database:", err);
  process.exit(1);
});
