const express = require("express");
const app = express();
const cookie = require("cookie-parser")
const db = require("./routes/db_config");
const PORT = 3000 

app.use("/js", express.static(__dirname + "/public/js"));
app.use("/css", express.static(__dirname + "/public/css"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.json());
app.use(cookie())
db.connect((err) => {
  if (err) throw err;
  console.log("Database succesfully conected");
});
app.use("/", require("./routes/pages"));
app.use("/api", require("./controllers/sec"));
app.listen(process.env.PORT || PORT);
