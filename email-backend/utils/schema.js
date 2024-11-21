const { sql } = require('drizzle-orm/neon');
const { pgTable, serial, varchar, boolean, time, timestamp } = require('drizzle-orm/pg-core');

// reminders schema
const Reminders = pgTable("reminders", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  dosage: varchar("dosage").notNull(),
  time: time("time").notNull(),
  frequency: varchar("frequency").notNull(),
  createdBy: varchar("created_by").notNull(),
  isDone: boolean("is_done").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

module.exports = { Reminders };