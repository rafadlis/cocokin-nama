import "dotenv/config";
import { serverConnection } from "./drizzle/server";

async function main() {
  const database = await serverConnection();
  console.log("Success");
  return database;
}

main();
