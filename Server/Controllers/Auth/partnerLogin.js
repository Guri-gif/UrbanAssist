const jwt = require("jsonwebtoken");
const config = require("../../Config/config");
const Partner = require("../../Models/partner_model");
const {
  partnerLoginValidation,
} = require("../../Services/partnerLoginValidation");

const partnerLogin = async (req, res, next) => {
  try {
    const loginValues = await partnerLoginValidation.validateAsync(req.body);
    const { email, password } = loginValues;

    const partner = await Partner.findOne({ email });
    if (!partner) {
      return res.status(404).json({
        success: false,
        message: "Partner not found. Please register first!",
      });
    }
    if (partner.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials!",
      });
    }

    const partnerInfo = {
      id: partner._id,
      role: partner.role,
    };

    const token = jwt.sign(partnerInfo, config.JWT_SECRET, { expiresIn: "1h" });
    partner.token = token;
    await partner.save();
    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      data: {
        username: partner.username,
        email: partner.email,
        _id: partner._id,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred during login.",
      error: error.message,
    });
  }
};

module.exports = partnerLogin;
