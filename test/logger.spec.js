/**
 * Heringsfish Log - https://github.com/blueskyfish/heringsfish-log.git
 *
 * Copyright (c) 2017 BlueSkyFish
 */

'use strict';

const assert = require('assert');

describe('Logger TestCases >', () => {

  const logger = require('../hf/logger');

  it('Should add the arguments', () => {
    logger.info('Hello "%s", what time is it? %s a clock', "Tommy", "12:30");
  });


  it('Should write warning', () => {
    logger.warn('Hello "%s", what time is it? %s a clock', "Tommy", "12:30");
  });

});
