/**
 * Heringsfish Log - https://github.com/blueskyfish/heringsfish-log.git
 *
 * Copyright (c) 2017 BlueSkyFish
 */

'use strict';

const _ = require('lodash');

const CONSTANTS = require('./constants');


/**
 * @name LogMessage
 * @property {string} timestamp
 * @property {string} logLevel
 * @property {string} version
 * @property {string} logName
 * @property {string} threadId
 * @property {string} threadName
 * @property {number} timeMillis
 * @property {number} logValue
 * @property {string} messageId
 * @property {string} logMessage
 */

class Parser {

  constructor(parseFunc) {
    this.parseFunc = parseFunc;
    this.count = 0;
  }

  process(data, sinkFunc, done) {

    if (!this.parseFunc || !data || !_.isFunction(sinkFunc)) {
      done();
      return;
    }

    const logMessage = this.parseFunc(data);

    if (logMessage) {
      sinkFunc(logMessage);
      this.count++;
    }

    done();
  }
}

/**
 * Returns the parser stream.
 *
 * @param {string} format
 * @return {Parser}
 */
module.exports.getParser = function (format) {
  const parseFunc = _getParserFunc(format);
  return new Parser(parseFunc);
};


/**
 *
 * @param {string} portion
 * @return {LogMessage|null}
 * @private
 */
function _parseJson(portion) {

  try {
    const item = JSON.parse(portion);

    /** @type {LogMessage} */
    const logMessage = {
      timestamp: _.get(item, '_Timestamp', ''),
      logLevel: _.get(item, '_Level', '-'),
      version: _.get(item, '_Version', '-'),
      logName: _.get(item, '_LoggerName', '-'),
      threadId: _.get(item, '_ThreadID', '-'),
      threadName: _.get(item, '_ThreadName', '-'),
      timeMillis: parseInt(_.get(item, '_TimeMillis', '0'), 10),
      logValue: parseInt(_.get(item, '_LevelValue', '0'), 10),
      messageId: _.get(item, '_MessageID', '-'),
      logMessage: _.get(item, '_LogMessage', '-')
    };

    // TODO parse JSON verbose message

    return logMessage;

  } catch (e) {
    // TODO error parse JSON warning message
    return null;
  }
}

/**
 * @param {string} portion
 * @return {LogMessage|null}
 * @private
 */
function _parseODL(portion) {

  try {
    const item = CONSTANTS.PARSE_ODL_FORMAT.exec(portion);
    if (!item) {
      // TODO parse ODL warning message
      return null;
    }
    // 1. Group -> timestamp
    // 2. Group -> version
    // 3. Group -> logLevel
    // 4. Group -> messageId
    // 5. Group -> logName
    // 6. Group -> threadId
    // 7. Group -> threadName
    // 8. Group -> timeMillis
    // 9. Group -> logValue
    // 10. Group -> logMessage

    /** @type {LogMessage} */
    const logMessage = {
      timestamp: item[1] || '-',
      logLevel: item[3] || '-',
      logName: item[5] || '-',
      version: item[2] || '-',
      threadId: item[6] || '-',
      threadName: item[7] || '-',
      timeMillis: parseInt(item[8] || '0', 10),
      logValue: parseInt(item[9] || '0', 10),
      messageId: item[4] || '-',
      logMessage: item[10] || '-'
    };

    // TODO parse ODL verbose message

    return logMessage;

  } catch (e) {
    // TODO error: parse ODL warning message
    return null;
  }
}

/**
 * @param {string} portion
 * @return {LogMessage|null}
 * @private
 */
function _parseUFL(portion) {

  try {
    const item = CONSTANTS.PARSE_UFL_FORMAT.exec(portion);
    if (!item) {
      // TODO parse UFL warning message
      return null;
    }

    //  1. Group -> timestamp
    //  2. Group -> logLevel
    //  3. Group -> version
    //  4. Group -> logName
    //  5. Group -> threadId
    //  6. Group -> threadName
    //  7. Group -> timeMillis
    //  8. Group -> logValue
    //  9. Group -> messageId
    // 10. Group -> logMessage

    /** @type {LogMessage} */
    const logMessage = {
      timestamp: item[1] || '-',
      logLevel: item[2] || '-',
      version: item[3] || '-',
      logName: item[4] || '-',
      threadId: item[5] || '-',
      threadName: item[6] || '-',
      timeMillis: parseInt(item[7] || '0', 10),
      logValue: parseInt(item[8] || '0', 10),
      messageId: item[9] || '-',
      logMessage: item[10] || '-'
    };

    // TODO parse UFL verbose message

    return logMessage;

  } catch (e) {
    // TODO error parse UFL warning message
    return null;
  }
}

function _getParserFunc(format) {
  switch (_.toUpper(format)) {
    case CONSTANTS.FORMAT_JSON:
      return _parseJson;
    case CONSTANTS.FORMAT_ODL:
      return _parseODL;
    case CONSTANTS.FORMAT_UFL:
      return _parseUFL;

    default:
      return null;
  }
}
