const joi = require('joi');

const newPassword = joi.string().min(5);
const token = joi.required();
const email = joi.string().email();

const recoveryPasswordSchema = joi.object({
  email: email.required()
});

const changePasswordSchema = joi.object({
  newPassword: newPassword.required(),
  token: token
});

module.exports = { recoveryPasswordSchema, changePasswordSchema };
