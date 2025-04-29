const Joi = require("joi");

const bookingValidation = Joi.object({
  serviceId: Joi.string().hex().length(24).required(),
  serviceProviderId: Joi.string().hex().length(24).required(),
  customerId: Joi.string().hex().length(24).required(), 
  date: Joi.date().required(),
  time: Joi.string().required(), 
});

module.exports = { bookingValidation };
