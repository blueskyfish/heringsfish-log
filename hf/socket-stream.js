/**
 * Heringsfish Log - https://github.com/blueskyfish/heringsfish-log.git
 *
 * Copyright (c) 2017 BlueSkyFish
 */

'use strict';

const Writable = require('stream').Writable;

const DEFAULT_MESSAGE = 'message';
const DEFAULT_SIZE = 32;

/**
 * @name SocketOptions
 * @property {Object} server
 * @property {string} [event] the event name
 * @property {number} [highWaterMark]
 */

/**
 * Returns a writable stream for the socket io server.
 *
 * @param {SocketOptions} options
 * @return {Writable}
 */
module.exports = function (options) {

  const server = options.server || null;
  const event  = options.event || DEFAULT_MESSAGE;

  return new Writable({

    objectMode: true,

    highWaterMark: Math.min(options.highWaterMark || DEFAULT_SIZE, DEFAULT_SIZE),

    write: function (logMessage, encoding, done) {
      _write(server, event, logMessage, done);
    },
  });
};


function _write(server, event, logMessage, done) {

  if (!server) {
    // TODO warning message -> missing socket io server
    return done();
  }

  process.nextTick(() => {
    server.emit(event, logMessage);
    // TODO verbose message

    done();
  });
}
