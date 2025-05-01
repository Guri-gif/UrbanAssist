const joi = require("joi");

const partnerLoginValidation = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
})

module.exports = {partnerLoginValidation}