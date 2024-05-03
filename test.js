const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "password",
  port: 5432,
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error executing query", err);
    return;
  }
  console.log("成功連結!!Current date from PostgreSQL:", res.rows[0].now);
  pool.end();
});
