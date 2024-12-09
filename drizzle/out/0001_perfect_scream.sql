ALTER TABLE "daftar_nama_murid" DROP CONSTRAINT "daftar_nama_murid_nama_lain_id_nama_lain_id_fk";
--> statement-breakpoint
ALTER TABLE "nilai" DROP CONSTRAINT "nilai_nama_lain_id_nama_lain_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "daftar_nama_murid" ADD CONSTRAINT "daftar_nama_murid_nama_lain_id_nama_lain_id_fk" FOREIGN KEY ("nama_lain_id") REFERENCES "public"."nama_lain"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nilai" ADD CONSTRAINT "nilai_nama_lain_id_nama_lain_id_fk" FOREIGN KEY ("nama_lain_id") REFERENCES "public"."nama_lain"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
