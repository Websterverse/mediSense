require("dotenv").config();
const { neon } = require("@neondatabase/serverless");
const { drizzle } = require("drizzle-orm/neon-http");
const schema = require("./schema"); // Ensure this matches your schema definition

const sql = neon(process.env.DATABASE_URL, {
  fetchOptions: { keepalive: true }, // Keeps connections alive
});

const db = drizzle(sql, { schema }); // Attach schema to the Drizzle instance

module.exports = { db };