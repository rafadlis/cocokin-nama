import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/drizzle/schema";
export async function serverConnection() {
  const client = postgres(process.env.DATABASE_URL!);
  const db = drizzle({ client, schema: schema });
  return db;
}
