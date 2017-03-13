/**
 * Heringsfish Log - https://github.com/blueskyfish/heringsfish-log.git
 *
 * Copyright (c) 2017 BlueSkyFish
 */

'use strict';

const util = require('util');

const _ = require('lodash');
const moment = require('moment');

let _verbose = false;

module.exports.setVerbose = function () {
  _verbose = true;
};

module.exports.verbose = function (message) {
  if (_verbose) {
    const args = Array.prototype.slice.call(arguments, 0);
    const msg = _formatMessage(message, args);
    _outputMessage('verbose', msg);
  }
};

module.exports.info = function (message) {
  const args = Array.prototype.slice.call(arguments, 0);
  const msg = _formatMessage(message, args);
  _outputMessage('info', msg);
};

module.exports.warn = function (message) {
  const args = Array.prototype.slice.call(arguments, 0);
  const msg = _formatMessage(message, args);
  _outputMessage('warning', msg);
};

function _formatMessage(message, args) {
  if (_.size(args) === 0) {
    return message;
  }
  return util.format.apply(util, args);
}

function _outputMessage(level, message) {
  const line = [
    '[', moment().format('HH:mm:ss.SSS'), '] ', _.padStart(level, 7, ' '), ': ', message
  ];
  console.info(line.join(''));
}
