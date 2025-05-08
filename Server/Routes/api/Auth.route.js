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
const uploadFile = require("../../Controllers/Auth/multer");
const createBooking = require("../../Controllers/Auth/booking");
const updateBookingStatus = require("../../Controllers/Auth/updateBooking");
const partnerLogin = require("../../Controllers/Auth/partnerLogin");
const partnerRegister = require("../../Controllers/Auth/partnerRegister");
const partnerData = require('../../Controllers/Auth/providerData');
const getProfile = require("../../Controllers/Auth/getProfile");
const bookingData = require("../../Controllers/Auth/bookingData");
const googleLogin = require("../../Controllers/Auth/googleLogin");
const payment = require("../../Controllers/Auth/stripeSession");

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
router.post("/uploads", uploadFile);
router.post("/book", createBooking);
router.put("/booking/:id/status", updateBookingStatus);
router.post("/partnerLogin", partnerLogin);
router.post('/partnerRegistration', partnerRegister)
router.get('/partnerData', partnerData)
router.get('/partnerProfile/:partnerId', getProfile)
router.get('/bookingData', bookingData)
router.post('/google', googleLogin)
router.post('/payment', payment)

module.exports = router;
