const User = require("../../Models/user_model");
const { registrationValidation } = require("../../Services/registerValidation");

const register = async (req, res) => {
  try {
    const registerValues = await registrationValidation.validateAsync(req.body);
    const { username, email, password } = registerValues;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already registered!",
      });
    }

    const newUser = new User({ username, email, password });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully!",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = register;
