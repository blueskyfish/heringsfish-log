/**
 * Heringsfish Log - https://github.com/blueskyfish/heringsfish-log.git
 *
 * Copyright (c) 2017 BlueSkyFish
 */

'use strict';



let CONSTANTS = {};


Object.defineProperty(CONSTANTS, 'SPITTER_JSON_FORMAT', {
  enumerable: true,
  writable: false,
  configurable: false,
  value: /^\{.+\}$/gm
});

Object.defineProperty(CONSTANTS, 'SPLITTER_ODL_FORMAT', {
  enumerable: true,
  writable: false,
  configurable: false,
  value: /^\[.+\]\s\[\[$\n[\s\S]+?\]\]$/gm
});

Object.defineProperty(CONSTANTS, 'SPLITTER_UFL_FORMAT', {
  enumerable: true,
  writable: false,
  configurable: false,
  value: /^\[#[\s\S]+?#\]$/gm
});

/**
 *  1. Group -> timestamp
 *  2. Group -> version
 *  3. Group -> logLevel
 *  4. Group -> messageId
 *  5. Group -> logName
 *  6. Group -> threadId
 *  7. Group -> threadName
 *  8. Group -> timeMillis
 *  9. Group -> logValue
 * 10. Group -> logMessage
 */
Object.defineProperty(CONSTANTS, 'PARSE_ODL_FORMAT', {
  enumerable: true,
  writable: false,
  configurable: false,
  value: /^\[(.+?)\]\s\[(.+?)\]\s\[(.+?)\]\s\[(.*?)\]\s\[(.+?)\]\s\[tid: _ThreadID=(.+?)\s_ThreadName=(.+?)\]\s\[timeMillis:\s(\d+?)\]\s\[levelValue:\s(\d+?)\]\s\[\[$\n\s\s([\s\S]*?)\]\]$/m
});

/**
 *  1. Group -> timestamp
 *  2. Group -> logLevel
 *  3. Group -> version
 *  4. Group -> logName
 *  5. Group -> threadId
 *  6. Group -> threadName
 *  7. Group -> timeMillis
 *  8. Group -> logValue
 *  9. Group -> messageId
 * 10. Group -> logMessage
 */
Object.defineProperty(CONSTANTS, 'PARSE_UFL_FORMAT', {
  enumerable: true,
  writable: false,
  configurable: false,
  value: /^\[#\|(.+?)\|(.+?)\|(.+?)\|(.+?)\|_ThreadID=(.+?);_ThreadName=(.+?);_TimeMillis=(\d+?);_LevelValue=(\d+?);_MessageID=(.*?);\|\n\s\s([\s\S]+?)\|#\]$/m
});

Object.defineProperty(CONSTANTS, 'FORMAT_JSON', {
  enumerable: true,
  writable: false,
  configurable: false,
  value: 'JSON'
});

Object.defineProperty(CONSTANTS, 'FORMAT_ODL', {
  enumerable: true,
  writable: false,
  configurable: false,
  value: 'ODL'
});

Object.defineProperty(CONSTANTS, 'FORMAT_UFL', {
  enumerable: true,
  writable: false,
  configurable: false,
  value: 'UFL'
});

Object.defineProperty(CONSTANTS, 'DEFAULT_SERVER_PORT', {
  enumerable: true,
  writable: false,
  configurable: false,
  value: 4201
});

Object.defineProperty(CONSTANTS, 'DEFAULT_ENCODING', {
  enumerable: true,
  writable: false,
  configurable: false,
  value: 'utf8'
});

Object.defineProperty(CONSTANTS, 'DEFAULT_TAIL_LINE', {
  enumerable: true,
  writable: false,
  configurable: false,
  value: 50
});

module.exports = CONSTANTS;
