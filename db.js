require("dotenv").config();
const dbHost = process.env.DB_HOST;

const { Pool } = require("pg");
const pool = new Pool({
  host: dbHost || "localhost",
  port: 5432,
  user: "postgres",
  password: "password",
  database: "postgres",
});

module.exports = pool;
