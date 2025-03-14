const User = require("../../Models/user_model");

const deleteAccount = async (req, res, next) => {

  console.log("Received ID:");

  try {
    const { id } = req.params;

    const findUser = await User.findByIdAndDelete(id);


    if (!findUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

module.exports = deleteAccount;
