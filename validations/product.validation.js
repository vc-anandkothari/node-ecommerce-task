const Joi = require('joi');

const responseHandler = require('../middlewares/response-handler');

const nameValidationMsgs = {
  'string.base': 'Name must be a string',
  'string.empty': 'Name is required',
  'string.min': 'Name must be at least {#limit} characters',
  'string.max': 'Name must not exceed {#limit} characters',
  'any.required': 'Name is required',
};

const descriptionValidationMsgs = {
  'string.base': 'Description must be a string',
  'string.empty': 'Description is required',
  'string.min': 'Description must be at least {#limit} characters',
  'string.max': 'Description must not exceed {#limit} characters',
  'any.required': 'Description is required',
};

const priceValidationMsgs = {
  'number.base': 'Price must be a number',
  'number.integer': 'Price must be an integer',
  'number.min': 'Price must be at least Rs.{#limit}',
  'number.max': 'Price must not exceed Rs.{#limit}',
};

const imagesValidationMsgs = {
  'string.base': 'Images must be a string',
  'string.empty': 'Images is required',
  'any.required': 'Images is required',
  'string.uri': 'Images Invalid URI',
};

const productJoiValidatonSchema = Joi.object({
  name: Joi.string().min(5).max(100).required().messages(nameValidationMsgs),
  description: Joi.string()
    .min(20)
    .max(500)
    .required()
    .messages(descriptionValidationMsgs),
  price: Joi.number()
    .min(1)
    .max(1000000)
    .required()
    .messages(priceValidationMsgs),
  images: Joi.array().required().messages(imagesValidationMsgs),
});

module.exports = (req, res, next) => {
  const { error } = productJoiValidatonSchema.validate(req.body);
  error
    ? responseHandler(res, 400, error?.details[0]?.message, [], error?.details)
    : next();
};
