/**
 * Heringsfish Log - https://github.com/blueskyfish/heringsfish-log.git
 *
 * Copyright (c) 2017 BlueSkyFish
 */

'use strict';

const through = require('through2');

const parserUtil = require('./parser-util');

const DEFAULT_SIZE = 32;

/**
 * @name ParserOptions
 * @property {string} format
 * @property {number} [highWaterMark]
 */

/**
 * Returns the parser stream
 *
 * @param {ParserOptions} options
 * @return {Transform}
 */
module.exports = function (options) {

  const parserOptions = {
    objectMode: true,
    highWaterMark: Math.min(options.highWaterMark || DEFAULT_SIZE, DEFAULT_SIZE)
  };

  const parser = parserUtil.getParser(options.format);

  return through.obj(parserOptions, function (data, encoding, done) {

    const sunkFunc = (logMessage) => {
      this.push(logMessage);
    };

    const doneFunc = () => {
      // TODO verbose message from parser.count
      done();
    };

    parser.process(data, sunkFunc, doneFunc);
  });
};
