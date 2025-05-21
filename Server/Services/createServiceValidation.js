const Joi = require('joi');

const createServiveValidation = Joi.object({
  name: Joi.string().required(),
  location_type: Joi.string().valid('at_home', 'at_site', 'home', 'onsite').required(),
  basePrice: Joi.number().required(),
  serviceProviderName: Joi.string().required(),
  serviceProviderEmail: Joi.string().email().required(),
  description: Joi.string().required()
});

module.exports = { createServiveValidation };