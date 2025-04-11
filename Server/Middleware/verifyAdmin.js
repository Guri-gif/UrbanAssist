const jwt = require("jsonwebtoken");
const config = require("../Config/config");

const verifyAdmin = (req, res, next) => {
  const adminToken = req.headers.authorization?.split(" ")[1];
  if (!adminToken)
    return res.status(401).json({
      message: "No token provided!",
    });

  try {
    const decoded = jwt.verify(adminToken, config.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        message: "You are not authorized to access this resource!",
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token!",
    });
  }
};

module.exports = verifyAdmin;
