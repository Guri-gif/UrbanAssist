const router = require("express").Router();
const register = require("../../Controllers/Auth/register");
const login = require("../../Controllers/Auth/login");
const deleteAccount = require("../../Controllers/Auth/deleteAccount");
const deleteMiddleware = require("../../Middleware/deleteUser.Auth");
const authMiddleware = require("../../Middleware/authMiddleware");
const userData = require("../../Controllers/Auth/userData");
const adminLogin = require("../../Controllers/Auth/adminLogin");
const verifyAdmin = require("../../Middleware/verifyAdmin");
const createUser = require("../../Controllers/Auth/createUser");

router.post("/register", register);
router.post("/login", login);
router.delete(
  "/deleteUser/:id",
  authMiddleware,
  deleteMiddleware(["admin"]),
  deleteAccount
);
router.get("/userData", userData);
router.post("/adminLogin", adminLogin);
router.post("/createUser", verifyAdmin, createUser);

module.exports = router;
