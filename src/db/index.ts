import { drizzle } from "drizzle-orm/node-postgres";
import { sql } from "@vercel/postgres"
import * as schema from "./schema";

export const db = drizzle(sql, { schema })