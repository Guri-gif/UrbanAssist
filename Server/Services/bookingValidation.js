const Joi = require("joi");

const bookingValidation = Joi.object({
  serviceId: Joi.string().hex().length(24).required(),
  customerId: Joi.string().hex().length(24).required(),
  customerName: Joi.string().required(),
  serviceName: Joi.string().required(),  // Validation for serviceName
  date: Joi.date().required(),
  time: Joi.string().required(),
  address: Joi.string().required(),
});

module.exports = { bookingValidation };
