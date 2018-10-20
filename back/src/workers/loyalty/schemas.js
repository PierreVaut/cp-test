'use strict';

const Joi = require('../../lib/joi');

const signupSchema = Joi.object({
  type: Joi.string().required(),
  payload: Joi.object({
    id: Joi.objectId().required(),
    name: Joi.string()
      .min(6)
      .required(),
  }),
});

const phoneUpdateSchema = Joi.object({
  type: Joi.string().required(),
  payload: Joi.object({
    id: Joi.objectId().required(),
    phoneNumber: Joi.string().min(10)
  }),
})

module.exports = {
  signupSchema,
  phoneUpdateSchema
};
