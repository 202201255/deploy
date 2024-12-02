const pool = require("../config/db");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  
  console.log(req.body);
  console.log("reach at protect");

  let token; 
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) { 
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(token); 
      const decoded = jwt.verify(token, "hello");
      console.log(decoded);

      const temp = await pool.query(
        `select * from login where role = '${decoded.id}'`
      );
      req.user = temp.rows[0];
      console.log(req.user);
      if (req.user.role == decoded.id) {
        console.log("decoded");
        next();
      }

      else {
        res.status(401).json({ mesasge: "Not Authorized, token failed" });
        console.log(token);
        // console.log(decoded.email);
      return;

      }
    } catch (error) {
      console.log(error);
      res.status(401).json({ mesasge: "Not Authorized, token failed" });
      return;
    }
  }

  if (!token) {
    res.status(401).json({ mesasge: "No token" });
    return;
  }
};

module.exports = protect;