import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  // "postgresql://beat_cancer_owner:KI4cMmgY9GJB@ep-twilight-boat-a5wededs.us-east-2.aws.neon.tech/beat_cancer?sslmode=require"
  "postgresql://beat-cancer_owner:q7igUfod6mSv@ep-rough-mode-a5a8w32e.us-east-2.aws.neon.tech/beat-cancer?sslmode=require"
);


export const db = drizzle(sql, { schema });
