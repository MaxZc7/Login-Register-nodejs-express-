const db = require("../routes/db_config")
const bcrypt = require("bcryptjs")

const register =  async (req, res) => {
   
  const { username, email, password:passwordNH } = req.body;
  if (!username || !email || !passwordNH)
    return res.json({ status: "error", error: "Please enter your data" });
  else {
    console.log(email)
    db.query(
      'SELECT email,username FROM users WHERE email = ? OR username = ?',
      [email, username],
      async (err, result) => {
        if (err) throw err;
        if (result[0])
          return res.json({
            status: "error",
            error: "Username or email has already been taken",
          });
        else {
          const password = await bcrypt.hash(passwordNH, 8);
          console.log(password)
          db.query(
            "INSERT INTO users SET ?",
            { username: username, email: email, password: password },
            (error, results) => {
              if (error) throw error;
              return res.json({
                status: "success",
                success: "User has been registered successfully",
              });
            }
          );
        }
      }
    );
  }
};

module.exports = register;
