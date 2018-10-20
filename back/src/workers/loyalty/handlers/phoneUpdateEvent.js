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
  const { id: riderId, phone_number } = message.payload;
  logger.info(
    { rider_id: riderId, phone_number },
    msg.starting,
  );

  try {
      const response = await riderModel.updateOne(
       riderId, {phone_number: phone_number}
        );
        if (response.result.nModified == 0){
          logger.error(
            {rider_id: riderId, phone_number},msg.KO)
          } else{
            logger.info(
              {rider_id: riderId, phone_number}, msg.OK)
        }
    } catch (err) {
      logger.error({ rider_id: riderId, phone_number }, msg.KO)
    }
  }

module.exports = handlePhoneUpdateEvent;
