import { sql } from "drizzle-orm";
import { integer, varchar, pgTable, serial, text, time, boolean, timestamp } from "drizzle-orm/pg-core";

// users schema
export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username").notNull(),
  age: integer("age").notNull(),
  location: varchar("location").notNull(),
  folders: text("folders")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  treatmentCounts: integer("treatment_counts").notNull(),
  folder: text("folder")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  createdBy: varchar("created_by").notNull(),
});

// records schema
export const Records = pgTable("records", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => Users.id)
    .notNull(),
  recordName: varchar("record_name").notNull(),
  analysisResult: varchar("analysis_result").notNull(),
  kanbanRecords: varchar("kanban_records").notNull(),
  createdBy: varchar("created_by").notNull(),
});

// reminders schema
export const Reminders = pgTable("reminders", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  dosage: varchar("dosage").notNull(),
  time: time("time").notNull(),
  frequency: varchar("frequency").notNull(),
  createdBy: varchar("created_by").notNull(),
  isDone: boolean("is_done").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
