'use strict';

const logger = require('chpr-logger');
const { ObjectID } = require('mongodb');

const { handleMessageError } = require('../../../lib/workers');
const riderModel = require('../../../models/riders');

/**
 * Bus message handler for user signup events
 *
 * @param   {Object} message The bus message object.
 * @param   {Object} messageFields The bus message metadata.
 * @returns {void}
 */

async function handlePhoneUpdateEvent(message, messageFields) {
  const { id: riderId, phoneNumber } = message.payload;
  console.log("handlePhoneUpdateEvent")
  logger.info(
    { rider_id: riderId, phoneNumber },
    `[worker.handlePhoneUpdateEvent] Received phone update event: ${phoneNumber} - ${riderId}`,
  );

  // TODO handle idempotency

  try {
    const response = await riderModel.updateOne(
      {_id: riderId},
      {$set: {phoneNumber: phoneNumber}}
      );
    console.log("Resposne", response.result, response.result.nModified == 0)
    if (response.result.nModified == 0){
       logger.error(
        { rider_id: riderId, phoneNumber },
        `[worker.handlePhoneUpdateEvent] Phone update FAIL (UnexistingUser Error)`,
      )
    } else{
      logger.info(
         { rider_id: riderId, phoneNumber },
         `[worker.handlePhoneUpdateEvent] Phone update OK`,
       );
    }
    } catch (err) {
    handleMessageError(err, message, messageFields);
  }
}

module.exports = handlePhoneUpdateEvent;
