export default {
  dialect: "postgresql",
  schema: "./src/utils/schema.jsx",
  out: "./drizzle",
  dbCredentials: {
    // url: "postgresql://beat_cancer_owner:KI4cMmgY9GJB@ep-twilight-boat-a5wededs.us-east-2.aws.neon.tech/beat_cancer?sslmode=require",
    // connectionString:
    //   "postgresql://beat_cancer_owner:KI4cMmgY9GJB@ep-twilight-boat-a5wededs.us-east-2.aws.neon.tech/beat_cancer?sslmode=require",
  
    url: "postgresql://beat-cancer_owner:q7igUfod6mSv@ep-rough-mode-a5a8w32e.us-east-2.aws.neon.tech/beat-cancer?sslmode=require",
    connectionString:
      "postgresql://beat-cancer_owner:q7igUfod6mSv@ep-rough-mode-a5a8w32e.us-east-2.aws.neon.tech/beat-cancer?sslmode=require",
  
  
    },
}; 


