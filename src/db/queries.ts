import { db } from "./index"
import { users, tenants } from "./schema"
import { eq } from "drizzle-orm"

export async function getUserByEmail(email: string) {
    const result = await db.select().from(users).where(eq(users.email, email))
    return result[0]
}

export async function getTenantUsers(tenantId: string) {
    return await db.select().from(users).where(eq(users.tenantId, tenantId))
}