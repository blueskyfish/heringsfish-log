/**
 * Heringsfish Log - https://github.com/blueskyfish/heringsfish-log.git
 *
 * Copyright (c) 2017 BlueSkyFish
 */

'use strict';

const Transform = require('stream').Transform;

const _         = require('lodash');

const logger    = require('./logger');

module.exports = function (options) {

  const objectMode = options.objectMode || true;
  const indentSize = options.indentSize || 2;

  return new Transform({
    objectMode: objectMode,

    transform: function (data, encoding, done) {
      let text = data;
      if (data instanceof Buffer) {
        text = data.toString();
      }
      if (!_.isString(text) && _.isObject(text)) {
        text = JSON.stringify(text, null, indentSize);
      }
      logger.info(text);

      this.push(data);

      done();
    }
  });
};
