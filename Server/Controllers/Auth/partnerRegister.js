const Partner = require("../../Models/partner_model");
const { partnerRegisterSchema } = require("../../Services/partnerValidation");

const partnerRegister = async (req, res, next) => {
  try {
    const registerValues = await partnerRegisterSchema.validateAsync(req.body);
    const {
      username,
      email,
      password,
      phone,
      serviceCategory,
      location,
      adhaarNumber,
    } = registerValues;
    const existingPartner = await Partner.findOne({ email });
    if (existingPartner) {
      return res.status(400).json({ message: "Partner already exists" });
    }
    const newPartner = new Partner({
      username,
      email,
      password,
      phone,
      serviceCategory,
      location,
      document: adhaarNumber,
    });
    await newPartner.save();
    return res.status(201).json({ message: "Partner registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = partnerRegister;
