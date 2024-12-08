import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export async function serverConnection() {
  const client = postgres(process.env.DATABASE_URL!);
  const db = drizzle({ client });
  return db;
}
