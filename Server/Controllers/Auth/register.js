const User = require("../../Models/user_model");
const Joi = require("joi");

const registrationValidation = Joi.object({
  username: Joi.string().optional(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = async (req, res) => {
  const { error } = registrationValidation.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser)
      return res.status(400).json({ message: "User already registered!" });

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    await newUser.save();

    res.json({ success: true, message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
