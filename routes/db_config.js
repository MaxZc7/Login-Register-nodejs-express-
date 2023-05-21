const sql = require("mysql");
const dotenv = require("dotenv").config();
const db = sql.createConnection({
  host: process.env.DATABABASE_HOST,
  user: process.env.DATABABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

module.exports = db;
