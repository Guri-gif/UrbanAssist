const joi = require("joi");

const createServiveValidation = joi.object({
  name: joi.string().required(),
  location_type: joi.string().valid("at_home", "at_site").required(),
  basePrice: joi.number().required(),
  serviceProviderName: joi.string().required(),
  serviceProviderEmail: joi.string().email().required(),
  serviceProviderId: joi.string().length(24).hex().required()
});

module.exports = { createServiveValidation };
