const Joi = require('joi');

const responseHandler = require('../middlewares/response-handler');

const nameValidationMsgs = {
  'string.base': 'Name must be a string',
  'string.empty': 'Name is required',
  'string.min': 'Name must be at least {#limit} characters',
  'string.max': 'Name must not exceed {#limit} characters',
  'any.required': 'Name is required',
};

const emailValidationMsgs = {
  'string.base': 'Email must be a string',
  'string.empty': 'Email is required',
  'string.email': 'Invalid email format',
  'any.required': 'Email is required',
};

const phoneValidationMsgs = {
  'string.base': 'Phone number must be a string',
  'string.min': 'Phone number must be at least {#limit} characters',
  'string.max': 'Phone number must not exceed {#limit} characters',
};

const ageValidationMsgs = {
  'number.base': 'Age must be a number',
  'number.integer': 'Age must be an integer',
  'number.min': 'Age must be at least {#limit}',
  'number.max': 'Age must not exceed {#limit}',
};

const passwordValidationMsgs = {
  'string.empty': 'Password is required',
  'any.required': 'Password is required',
};

const userJoiValidatonSchema = Joi.object({
  name: Joi.string().min(5).max(50).required().messages(nameValidationMsgs),
  phone: Joi.string().min(8).max(10).messages(phoneValidationMsgs),
  age: Joi.number().min(18).max(100).messages(ageValidationMsgs),
  email: Joi.string().email().required().messages(emailValidationMsgs),
  password: Joi.string().required().messages(passwordValidationMsgs),
  isUserVerified: Joi.boolean().optional().default(false),
  userVerificationCode: Joi.optional(),
});

module.exports = (req, res, next) => {
  const { error } = userJoiValidatonSchema.validate(req.body);
  error
    ? responseHandler(res, 400, error?.details[0]?.message, [], error?.details)
    : next();
};
