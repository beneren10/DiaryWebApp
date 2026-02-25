const { Pool } = require("pg")

const db = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false } // needed for Supabase SSL
});


db.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ PostgreSQL connection error:", err));

module.exports = db