#!/usr/bin/env node

/**
 * Heringsfish Log - https://github.com/blueskyfish/heringsfish-log.git
 *
 * Copyright (c) 2017 BlueSkyFish
 */

'use strict';


const CONSTANTS = require('./hf/constants');
const logger    = require('./hf/logger');
const initialize = require('./hf/initialize');

(function (projectPath, currentPath, argv) {

  const settings = initialize(projectPath, currentPath, argv);

  if (!settings) {
    logger.warn('Error: could not load the "hflog"...');
    process.exit(1);
  }

  const startApp = require('./hf/application');

  startApp(projectPath, currentPath, settings)

} (__dirname, process.cwd(), process.argv.slice(2)));

