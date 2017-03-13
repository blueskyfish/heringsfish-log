/**
 * Heringsfish Log - https://github.com/blueskyfish/heringsfish-log.git
 *
 * Copyright (c) 2017 BlueSkyFish
 */

'use strict';

const spawn    = require('child_process').spawn;
const Readable = require('stream').Readable;

const DEFAULT_LINE = 300;
const DEFAULT_ENCODING = 'utf8';

const COMMAND = 'tail';

/**
 * @name TailOptions
 * @property {string} file
 * @property {number} [line]
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
    '-n', options.line || DEFAULT_LINE,
    options.file
  ];

  const cmdOptions = {
    cwd: options.cwd,
    env: options.env
  };


  const tail = spawn(COMMAND, cmdParams, cmdOptions);

  const reader = new Readable({
    encoding: DEFAULT_ENCODING,
    read: function (size) {}
  });

  tail.stdout.setEncoding(DEFAULT_ENCODING);
  tail.stdout.on('data', (data) => {
    if (data instanceof Buffer) {
      data = data.toString();
    }
    reader.push(data);
  });


  tail.stderr.setEncoding(DEFAULT_ENCODING);
  tail.stderr.on('data', (data) => {
    if (data instanceof Buffer) {
      data = data.toString();
    }
    // TODO warning message from stderr output
  });

  tail.on('error', (err) => {
    // TODO  warning message from tail error
  });

  tail.on('close', (code) => {
    reader.push(null);
    // TODO info message from exist code of "tail"
  });

  return reader;
};
