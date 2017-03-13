/**
 * Heringsfish Log - https://github.com/blueskyfish/heringsfish-log.git
 *
 * Copyright (c) 2017 BlueSkyFish
 */

'use strict';

const through = require('through2');

const splitterUtil = require('./splitter-util');

const DEFAULT_SIZE = 32;

/**
 * @name SplitterOptions
 * @property {string} format
 * @property {number} [highWaterMark] the maximum of buffer
 */

/**
 * Returns the splitter stream.
 *
 * @param {SplitterOptions} options
 * @return {Transform}
 */
module.exports = function (options) {

  const transObjects = {
    objectMode: true,
    highWaterMark: Math.min(options.highWaterMark || DEFAULT_SIZE, DEFAULT_SIZE)
  };

  const splitter = splitterUtil.getSplitter(options.format);

  return through.obj(transObjects, function _transform(data, encoding, done) {

    const sunkFunc = (line) => {
      this.push(line);
    };

    const doneFunc = () => {
      // TODO verbose message from the splitter.count
      done();
    };

    if (data instanceof Buffer) {
      data = data.toString();
    }

    splitter.process(data, sunkFunc, doneFunc);
  }, function _flush(done) {

    const sunkFunc = (line) => {
      this.push(line);
    };

    const doneFunc = () => {
      // TODO verbose message from the splitter.count
      done();
    };

    splitter.flush(sunkFunc, doneFunc);
  });
};
