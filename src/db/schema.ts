import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const tenants = pgTable("tenants", {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const users = pgTable("users", {
    id: varchar("id", { length: 36 }).primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    tenantId: varchar("tenant_id", { length: 36 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
})