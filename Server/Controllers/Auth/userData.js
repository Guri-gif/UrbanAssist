const User = require("../../Models/user_model");

const userData = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
  }
};


module.exports = userData;