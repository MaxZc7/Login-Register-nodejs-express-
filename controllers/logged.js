const db = require("../routes/db_config");
const jwt = require("jsonwebtoken");

const logged = (req, res, next) => {
  if (!req.cookies.userRegistered) return next();
  try {
    const decoded = jwt.verify(
      req.cookies.userRegistered,
      process.env.JWT_SECRET
    );
    db.query(
      "SELECT * FROM users WHERE id = ?",
      [decoded.id],
      (error, resultado) => {
        req.user = resultado[0];
        return next();
      }
    );
  } catch (error) {
    if (error) return next();
  }
};

module.exports = logged