CREATE TABLE IF NOT EXISTS "daftar_nama_murid" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"kelas" varchar(255) NOT NULL,
	"nomor_absen" varchar(255) NOT NULL,
	"nama_lain_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nama_lain" (
	"id" serial PRIMARY KEY NOT NULL,
	"nama_lain" varchar(255) NOT NULL,
	"kelas" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nilai" (
	"id" serial PRIMARY KEY NOT NULL,
	"benar" integer NOT NULL,
	"nama_lain_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "daftar_nama_murid" ADD CONSTRAINT "daftar_nama_murid_nama_lain_id_nama_lain_id_fk" FOREIGN KEY ("nama_lain_id") REFERENCES "public"."nama_lain"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nilai" ADD CONSTRAINT "nilai_nama_lain_id_nama_lain_id_fk" FOREIGN KEY ("nama_lain_id") REFERENCES "public"."nama_lain"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
