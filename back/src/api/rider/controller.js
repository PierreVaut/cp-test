'use strict';

const HttpStatus = require('http-status-codes');
const logger = require('chpr-logger');

const Joi = require('../../lib/joi');
const riders = require('../../models/riders');

const { getLoyaltyInfoSchema } = require('./schemas');

/**
 * Get current rider status
 *
 * @param {Object} req express request
 * @param {Object} res express response
 *
 * @returns {Object} response
 */
async function getLoyaltyInfo(req, res) {
  const { error, value: validatedParams } = Joi.validate(
    req.params,
    getLoyaltyInfoSchema,
  );

  if (error) {
    logger.error({ error }, '[loyalty#getLoyaltyInfo] Error: invalid body');
    return res.sendStatus(HttpStatus.BAD_REQUEST);
  }

  const { rider_id: riderId } = validatedParams;
  logger.info(
    { rider_id: riderId },
    '[loyalty#getLoyaltyInfo] Rider info requested',
  );

  const rider = await riders.findOneById(riderId, { name: 1, status: 1, ride_count: 1, loyalty_points: 1 });
  if (!rider) {
    logger.info(
      { rider_id: riderId },
      '[loyalty#getLoyaltyInfo] User does not exist',
    );
    return res.sendStatus(HttpStatus.NOT_FOUND);
  }

  return res.send(rider);
}

async function getLoyaltyTopUsers(req, res){
  
  console.log("getLoyaltyTopUsers")
  const limit = 10
  
  logger.info({},`[loyalty#getLoyaltyInfo] Top ${limit} users requested`);
  const topUsers = await riders.find().sort({"ride_count": -1}).limit(limit).toArray();
  if (!topUsers) {
    logger.info(
      { },
      '[loyalty#getLoyaltyInfo] topUsers server error',
    );
    return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
  }

  return res.send(topUsers);
}

module.exports = {
  getLoyaltyInfo,
  getLoyaltyTopUsers
};
