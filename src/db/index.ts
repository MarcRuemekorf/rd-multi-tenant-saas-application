import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from "@neondatabase/serverless";
import { config } from 'dotenv'
import { tenants, users } from './schema'
import { hash } from '../lib/bcrypt'
import { v4 as uuidv4 } from 'uuid'

config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle({ client: sql });

async function main() {
    console.log("🌱 Seeding database...")

    const tenantId = uuidv4()

    const tenant: typeof tenants.$inferInsert = {
        id: tenantId,
        name: "Acme Corp",
    };

    const user: typeof users.$inferInsert = {
        id: uuidv4(),
        email: "admin@acme.com",
        password: await hash("password123"),
        tenantId: tenantId,
    };

    await db.insert(tenants).values([
        tenant
    ])

    await db.insert(users).values([
        user
    ])

    console.log("✅ Seed complete.")
}

main();