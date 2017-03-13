#!/usr/bin/env node

/**
 * Heringsfish Log - https://github.com/blueskyfish/heringsfish-log.git
 *
 * Copyright (c) 2017 BlueSkyFish
 */

'use strict';

(function (projectPath, currentPath, argv) {

  const fs       = require('fs');

  const minimist = require('minimist');

  const app       = require('./hf/application');
  const logger    = require('./hf/logger');
  const CONSTANTS = require('./hf/constants');


  // Parameters / Arguments ??

  const params = minimist(argv);

  const file = params.file;

  if (!file || !fs.existsSync(file)) {
    logger.warn('Server Log is missing (%s)', file);
    process.exit(1);
    return;
  }

  /**
   * @type {ApplicationOptions}
   */
  const appOptions = {
    file: file,
    port: params.port,
    line: params.line,
    format: params.format || CONSTANTS.FORMAT_ODL
  };

  app.run(projectPath, currentPath, appOptions)

} (__dirname, process.cwd(), process.argv.slice(2)));
