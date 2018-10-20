'use strict';

const logger = require('chpr-logger');

const { handleMessageError } = require('../../../lib/workers');
const riderModel = require('../../../models/riders');

/**
 * Bus message handler for user signup events
 *
 * @param   {Object} message The bus message object.
 * @param   {Object} messageFields The bus message metadata.
 * @returns {void}
 */

const msg = {prefix: "[worker.RideCompletedEvent] :"}
msg.starting = `${msg.prefix} Received completed ride event`
msg.OK = `${msg.prefix} Completed ride OK`
msg.KO = `${msg.prefix} Completed ride FAIL` 

const loyalty_details = {
  0: {status: 'bronze', bonus: 1},
  20: {status: 'silver', bonus: 3},
  50: {status: 'gold', bonus: 5},
  100: {status: 'platinum', bonus: 10}
}

function getLoyaltyDetails(rideCount){
  return Object.keys(loyalty_details).sort((a, b) => a - b).reduce(
      (status_max, key) => {
          if(rideCount >= key){
            status_max = loyalty_details[key]
          }
          return status_max      
    }, 0 )
}


async function rideCompletedEvent(message, messageFields) {
  const { id: rideId, rider_id: riderId, amount } = message.payload;
  logger.info(
    { riderId: riderId, rideId: rideId, amount },
    msg.starting,
  );

  try {
    const rider = await riderModel.findOneById(riderId)
    if(!rider){
      return logger.error({rider_id: riderId, ride_id: rideId, amount}, msg.KO)
    }
    const updatedRideCount = rider.ride_count + 1 
    const loyaltyDetails = getLoyaltyDetails(updatedRideCount)
    const updatedStatus = loyaltyDetails.status
    const updatedLoyaltyPoints = (rider.loyalty_points + Math.floor(amount) * loyaltyDetails.bonus)
    
    const update_fields = {
      "status": updatedStatus,
      "ride_count": updatedRideCount,
      "loyalty_points": updatedLoyaltyPoints
    }

    await riderModel.updateOne(riderId, update_fields)
    logger.info(update_fields, msg.OK );

  } catch (err) {
    handleMessageError(err, message, messageFields);
  }
}

module.exports = rideCompletedEvent;
