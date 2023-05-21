const db = require("../routes/db_config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
   
  const { username, password } = req.body;
  if (!username || !password)
    return res.json({
      status: "error",
      error: "Introduzca su usuario y contraseña",
    });
  else {
    console.log(username)
    db.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      async (error, results) => {
        if (error) throw error;
        if (
          !results.length ||
          !(await bcrypt.compare(password, results[0].password))
        )
          return res.json({
            status: "error",
            error: "Incorrect username or password",
          });
        else {
          const token = jwt.sign(
            { id: results[0].id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES });
            const cookieOptions = {
                expiresIn: new Date(
                    Date.now() + process.env.JWT_EXPIRES * 24 * 60 * 60
                )};
                res.cookie("userRegistered", token, cookieOptions);
                return res.json({ status: "success", success: "User Logged successfully"})
        }
      }
    );
  }
};

module.exports = login;
