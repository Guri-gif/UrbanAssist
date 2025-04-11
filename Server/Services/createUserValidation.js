const joi = require('joi')

const createUserValidation = joi.object({
    username: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    role: joi.string().valid('user','admin')
})

module.exports = { createUserValidation }