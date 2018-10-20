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
    phoneNumber: Joi.string().min(10).required()
  }),
})

const rideCreateSchema = Joi.object({
  type: Joi.string().required(),
  payload: Joi.object({
    id: Joi.objectId().required(),
    amount: Joi.number().min(0).max(9999),
    rider_id: Joi.string().required()
  }),
})

const rideCompleteSchema = Joi.object({
  type: Joi.string().required(),
  payload: Joi.object({
    id: Joi.objectId().required(),
    amount: Joi.number().min(0).max(9999),
    rider_id: Joi.string().required()
  }),
})

module.exports = {
  signupSchema,
  phoneUpdateSchema,
  rideCreateSchema,
  rideCompleteSchema
};
