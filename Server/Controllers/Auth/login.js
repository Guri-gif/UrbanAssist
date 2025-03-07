const User = require("../../Models/user_model");
const Joi = require("joi");

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = async (req, res) => {
  const { error } = loginValidation.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res
        .status(404)
        .json({ message: "User not found. Please register first!" });

    if (user.password !== req.body.password) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    res.json({ success: true, message: "Login successful!" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
