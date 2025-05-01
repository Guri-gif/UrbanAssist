const Partner = require("../../Models/partner_model");

const partnerData = async (req, res, next) => {
  try {
    const partner = await Partner.find();
    res.json({
      message: "Partner data fetched successfully",
      data: partner,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = partnerData;
