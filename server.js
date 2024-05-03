const express = require("express");
const pool = require("./db");
const port = 3000;

const app = express();
app.use(express.json());

//test
app.get("/test", (req, res) => {
  res.status(200).send("伺服器運行連結成功");
});
//routes
app.get("/", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM schools");
    res.status(200).send(data.rows);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.post("/", async (req, res) => {
  const { name, location } = req.body;
  console.log(name + " and " + location);
  try {
    await pool.query("INSERT INTO schools (name, address) VALUES ($1, $2)", [
      name,
      location,
    ]);
    console.log("Successfully added child");
    res.status(200).send({ message: "Successfully added child" });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// create table
app.get("/setup", async (req, res) => {
  try {
    await pool.query(
      "CREATE TABLE schools(id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))"
    );
    console.log("Successfully added table");
    res.status(200).send({ message: "Successfully added table" });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// delete table
app.delete("/deleteTable", async (req, res) => {
  try {
    await pool.query("DROP TABLE IF EXISTS schools");
    console.log("Table deleted successfully");
    res.status(200).send({ message: "Table deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`伺服器正在聆聽 port:${port}`);
});
