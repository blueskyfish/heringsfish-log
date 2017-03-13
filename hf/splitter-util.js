/**
 * Heringsfish Log - https://github.com/blueskyfish/heringsfish-log.git
 *
 * Copyright (c) 2017 BlueSkyFish
 */

'use strict';

const _ = require('lodash');

const CONSTANTS = require('./constants');

class Splitter {

  constructor(worker) {
    this.parseFunc = worker;
    this.lastData = null;
    this.count = 0;
  }

  process(data, sinkFunc, done) {

    if (!this.parseFunc || !data || !_.isFunction(sinkFunc)) {
      done();
      return;
    }

    if (this.lastData) {
      // add the last data from the former process
      data = this.lastData + data;
    }

    this.doProcess(data, sinkFunc);

    done();
  }

  doProcess(data, sinkFunc) {

    let result;
    let fromIndex;
    let lastIndex;

    // reset the lastIndex !!
    this.parseFunc.lastIndex = 0;

    while (result = this.parseFunc.exec(data)) {

      fromIndex = result['index'];
      lastIndex = this.parseFunc.lastIndex;

      // TODO verbose message ">> from %s -> %s", fromIndex, lastIndex;

      const line = data.substring(fromIndex, lastIndex);
      this.count++;

      // send to the sunk
      sinkFunc(line);
    }

    if (lastIndex && lastIndex < data.length) {
      this.lastData = data.substring(lastIndex);
    } else if (!lastIndex) {
      // the while is not run
      this.lastData = data;
    } else {
      this.lastData = null;
    }
  }

  flush(sinkFunc, done) {

    if (!_.isFunction(sinkFunc) || !this.lastData) {
      done();
    }

    // TODO verbose message for flush !!

    this.doProcess(this.lastData, sinkFunc);

    done();
  }
}
/**
 * Returns the splitter instance with its process method.
 *
 * ```js
 * const splitter = splitterUtil.getSpitter('json');
 *
 * const stream = ....
 * const sunk = (line) => {
 *   stream.push(line);
 * }
 * splitter.process(data, sunk, done);
 * ```
 *
 * @param {string} format the server log format
 * @return {Splitter}
 */
module.exports.getSplitter = function (format) {

  const worker = _getSplitterFormat(format);

  return new Splitter(worker);
};



/**
 * Return the splitter RegExp format.
 *
 * @param {string} format
 * @return {RegExp|null}
 * @private
 */
function _getSplitterFormat(format) {
  switch (_.toUpper(format)) {
    case CONSTANTS.FORMAT_JSON:
      return CONSTANTS.SPITTER_JSON_FORMAT;
    case CONSTANTS.FORMAT_ODL:
      return CONSTANTS.SPLITTER_ODL_FORMAT;
    case CONSTANTS.FORMAT_UFL:
      return CONSTANTS.SPLITTER_UFL_FORMAT;
    default:
      return null;
  }
}
