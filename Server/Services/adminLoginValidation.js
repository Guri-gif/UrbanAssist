const joi = require("joi");

const adminLoginValidation = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
})

module.exports = {adminLoginValidation}