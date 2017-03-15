/**
 * Heringsfish Log - https://github.com/blueskyfish/heringsfish-log.git
 *
 * Copyright (c) 2017 BlueSkyFish
 */

'use strict';

const spawn    = require('child_process').spawn;
const Readable = require('stream').Readable;

const CONSTANTS = require('./constants');

const COMMAND = 'tail';

/**
 * @name TailOptions
 * @property {string} file
 * @property {number} line
 * @property {string} cwd
 * @property {object} env
 */

/**
 *
 * @param {TailOptions} options
 * @return {Readable}
 */
module.exports = function (options) {

  const cmdParams = [
    '-f',
    '-n', options.line,
    options.file
  ];

  const cmdOptions = {
    cwd: options.cwd,
    env: options.env
  };

  const cmdTail = spawn(COMMAND, cmdParams, cmdOptions);

  const reader = new Readable({
    encoding: CONSTANTS.DEFAULT_ENCODING,
    read: function (size) {}
  });

  cmdTail.stdout.setEncoding(CONSTANTS.DEFAULT_ENCODING);
  cmdTail.stdout.on('data', (data) => {
    if (data instanceof Buffer) {
      data = data.toString();
    }
    reader.push(data);
  });


  cmdTail.stderr.setEncoding(CONSTANTS.DEFAULT_ENCODING);
  cmdTail.stderr.on('data', (data) => {
    if (data instanceof Buffer) {
      data = data.toString();
    }
    // TODO warning message from stderr output
  });

  cmdTail.on('error', (err) => {
    // TODO  warning message from tail error
  });

  cmdTail.on('close', (code) => {
    reader.push(null);
    // TODO info message from exist code of "tail"
  });

  return reader;
};
