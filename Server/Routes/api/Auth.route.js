const router = require("express").Router();
const register = require("../../Controllers/Auth/register");
const login = require("../../Controllers/Auth/login");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
