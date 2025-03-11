const router = require("express").Router();
const register = require("../../Controllers/Auth/register");
const login = require("../../Controllers/Auth/login");
const deleteAccount = require("../../Controllers/Auth/deleteAccount");

router.post("/register", register);
router.post("/login", login);
router.delete("/deleteUser/:id", deleteAccount)

module.exports = router;
