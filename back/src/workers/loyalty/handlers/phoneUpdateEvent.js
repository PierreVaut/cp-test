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

const msg = {prefix: "[worker.handlePhoneUpdateEvent] :"}
msg.starting = `${msg.prefix} Received phone update event`
msg.OK = `${msg.prefix} Phone update OK`
msg.KO =  `${msg.prefix} Phone update FAIL (UnexistingUser Error)`

async function handlePhoneUpdateEvent(message, messageFields) {
  const { id: riderId, phoneNumber } = message.payload;
  logger.info(
    { rider_id: riderId, phoneNumber },
    msg.starting,
  );

  try {
      const response = await riderModel.updateOne(
        {_id: riderId},
        {$set: {phoneNumber: phoneNumber}}
        );
        if (response.result.nModified == 0){
          logger.error(
            {rider_id: riderId, phoneNumber},msg.KO)
          } else{
            logger.info(
              {rider_id: riderId, phoneNumber}, msg.OK)
        }
    } catch (err) {
      handleMessageError(err, message, messageFields);
    }
  }

module.exports = handlePhoneUpdateEvent;
