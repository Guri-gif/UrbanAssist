const jwt = require("jsonwebtoken");
const config = require("../../Config/config");
const User = require("../../Models/user_model");
const { adminLoginValidation } = require("../../Services/adminLoginValidation");

const adminLogin = async (req, res, next) => {
  try {
    const adminValues = await adminLoginValidation.validateAsync(req.body);
    const { email, password } = adminValues;

    const admin = await User.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found. Please register first!",
      });
    }

    if (admin.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials!",
      });
    }

    if (admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this resource!",
      });
    }
    const adminInfo = {
      id: admin._id,
      role: admin.role,
    };

    const adminToken = jwt.sign(adminInfo, config.JWT_SECRET, {
      expiresIn: "1h",
    });

    admin.token = adminToken;
    await admin.save();
    
    res.status(200).json({
      success: true,
      message: "Login successful!",
      token: adminToken,
      data: {
        username: admin.username,
        email: admin.email,
        _id: admin._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = adminLogin;
