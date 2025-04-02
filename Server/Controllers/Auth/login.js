const jwt = require("jsonwebtoken");
const config = require("../../Config/config");
const User = require("../../Models/user_model");
const { loginValidation } = require("../../Services/loginValidation");

const login = async (req, res, next) => {
  try {
    const loginValues = await loginValidation.validateAsync(req.body);
    const { email, password } = loginValues;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register first!",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials!",
      });
    }

    const userInfo = {
      id: user._id,
      role: user.role,
    };

    const token = jwt.sign(userInfo, config.JWT_SECRET, { expiresIn: "1d" });

    user.token = token;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      data: { username: user.username, email: user.email, _id: user._id },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
