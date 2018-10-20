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

const msg = {prefix: "[worker.RideCreateEvent] :"}
msg.starting = `${msg.prefix} Received create ride event`
// msg.OK = `${msg.prefix} Create ride OK`
// msg.KO = `${msg.prefix} Create ride FAIL`

async function RideCreateEvent(message, messageFields) {
  // const { id: rideId, rider_id: riderId, amount } = message.payload;
  // logger.info(
  //   { rider_id: riderId, rideId, amount },
  //   msg.starting,
  // );

  // We put all the loyalty logic in rideCompleteEvent handler
  // TODO: we should check if a complete ride was duely created before the ride is completed

}

module.exports = RideCreateEvent;
