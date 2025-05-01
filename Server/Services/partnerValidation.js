const Joi = require("joi");

const partnerRegisterSchema = Joi.object({
  username: Joi.string().trim().required(),
  email: Joi.string().email().lowercase().required(),
  phone: Joi.number().integer().min(1000000000).max(9999999999).required(), // 10-digit mobile number
  password: Joi.string().min(6).required(),
  serviceCategory: Joi.string()
    .valid(
      "Plumber",
      "Electrician",
      "Carpenter",
      "Mechanic",
      "Painter",
      "Home Cleaner",
      "Others"
    )
    .required(),
  location: Joi.object({
    city: Joi.string().required(),
    state: Joi.string().required(),
    pinCode: Joi.number().required(),
  }).required(),
  adhaarNumber: Joi.string()
    .pattern(/^\d{4}\s\d{4}\s\d{4}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Adhaar number must be in the format XXXX XXXX XXXX",
    }),
});

module.exports = { partnerRegisterSchema };
