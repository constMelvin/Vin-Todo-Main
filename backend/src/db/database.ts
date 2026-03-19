import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema.js";

export const pool = new Pool({
	connectionString: process.env.DATABASE_URL!,
	max: 10,
	idleTimeoutMillis: 30000,
});

// You can specify any property from the node-postgres connection options
export const db = drizzle(pool, { schema, casing: "snake_case" });
