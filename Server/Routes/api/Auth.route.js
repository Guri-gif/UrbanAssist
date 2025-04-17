const router = require("express").Router();
const register = require("../../Controllers/Auth/register");
const login = require("../../Controllers/Auth/login");
const deleteAccount = require("../../Controllers/Auth/deleteAccount");
const roleAuthMiddleware = require("../../Middleware/roleAuth");
const authMiddleware = require("../../Middleware/authMiddleware");
const userData = require("../../Controllers/Auth/userData");
const adminLogin = require("../../Controllers/Auth/adminLogin");
const verifyAdmin = require("../../Middleware/verifyAdmin");
const createUser = require("../../Controllers/Auth/createUser");
const createService = require("../../Controllers/Auth/createService");
const servicedata = require("../../Controllers/Auth/serviceData");
const updateUser = require("../../Controllers/Auth/updateUser");

router.post("/register", register);
router.post("/login", login);
router.delete(
  "/deleteUser/:id",
  authMiddleware,
  roleAuthMiddleware(["admin"]),
  deleteAccount
);
router.get("/userData", authMiddleware, verifyAdmin, userData);
router.post("/adminLogin", adminLogin);
router.post("/createUser", verifyAdmin, createUser);
router.post("/createService", verifyAdmin, createService);
router.get("/serviceData", authMiddleware, verifyAdmin, servicedata);
router.put(
  "/updateUser/:id",
  authMiddleware,
  roleAuthMiddleware(["admin"]),
  updateUser
);

module.exports = router;
