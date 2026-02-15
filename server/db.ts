import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

// Database is optional: when DATABASE_URL is not set, the app runs with in-memory mock storage
export const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : null;
export const db = pool ? drizzle(pool, { schema }) : null;
