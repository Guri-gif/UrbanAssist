const Joi = require("joi");

const registrationValidation = Joi.object({
  username: Joi.string().when(Joi.ref("$isSignUp"), {
    is: true,
    then: Joi.required(),
  }),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = { registrationValidation };
