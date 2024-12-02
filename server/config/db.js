const { config } = require("dotenv");
const { Pool } = require("pg");
require("dotenv").config();
config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL + "?sslmode=require",
    ssl: {
      rejectUnauthorized: require  // This allows the connection without certificate validation
    }
  });
pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => {
    console.error("Error connecting to PostgreSQL:", err.message);
    process.exit(1);
  });

  module.exports = pool;