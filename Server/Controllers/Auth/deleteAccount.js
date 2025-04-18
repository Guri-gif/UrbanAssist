const User = require("../../Models/user_model");

const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Only admins can delete accounts." });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = deleteAccount;
