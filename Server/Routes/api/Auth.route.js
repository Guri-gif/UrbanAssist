const router = require("express").Router();
const register = require("../../Controllers/Auth/register");
const login = require("../../Controllers/Auth/login");
const deleteAccount = require("../../Controllers/Auth/deleteAccount");
const deleteMiddleware = require("../../Middleware/deleteUser.Auth");
const authMiddleware = require("../../Middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.delete(
  "/deleteUser/:id",
  authMiddleware,
  deleteMiddleware(["admin"]),
  deleteAccount
);

module.exports = router;
