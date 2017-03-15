/**
 * Heringsfish Log - https://github.com/blueskyfish/heringsfish-log.git
 *
 * Copyright (c) 2017 BlueSkyFish
 */

'use strict';

const fs        = require('fs');
const path      = require('path');

const _         = require('lodash');
const minimist  = require('minimist');

const CONSTANTS = require('./constants');


/**
 * @name Settings
 * @property {string} logFile
 * @property {number} serverPort
 * @property {string} format
 * @property {number} tailLine
 */

/**
 *
 * @param {string} projectPath
 * @param {string} currentPath
 * @param {string[]} argv
 * @return {Settings}
 * @private
 */
function initialize(projectPath, currentPath, argv) {

  const SERVER_LOG = 'server.log';
  const SERVER_CONFIG = 'server-config.json';

  /**
   * @type {Settings}
   */
  const settings = {
    logFile: null,
    serverPort: 0,
    format: null,
    tailLine: 0
  };

  const params = minimist(argv);
  let serverConfig = null;

  // region > Internal Functions

  const _getValue = function (name, def) {
    if (serverConfig) {
      return _.get(serverConfig, name, def);
    }
    return def;
  };

  const _parseValue = function (value) {
    if (_.isString(value)) {
      return value.replace(/\{([a-zA-Z.]+)\}/g, (text, key) => {
        key = key || '';
        switch (_.toLower(key)) {
          case 'user.home':
            return null; // TODO get user home path
          case 'project.home':
            return currentPath;
          case 'server.home':
            return _parseValue(_getValue('server.home', null));
          case 'domain.name':
            return _getValue('domain.name', 'domain1');
          case 'domain.home':
            return _parseValue(_getValue('domain.home'));
          case 'project.version':
          case 'version':
            return _getValue('version', '0.0.0');
          case 'project.name':
          case 'name':
            return _getValue('name', text);
          default:
            // lookup in the settings
            const settingKey = 'settings.' + key;
            return _parseValue(_getValue(settingKey, key));
        }
      });
    }
    return value;
  };

  const _isServerLog = function (file) {
    return path.basename(file) === SERVER_LOG;
  };

  const _isServerConfig = function (file) {
    return path.basename(file) === SERVER_CONFIG;
  };

  const _getFileStat = function (file) {
    try {
      return fs.statSync(file);
    } catch (e) {
      return null;
    }
  };

  const _readJson = function (file) {
    try {
      const content = fs.readFileSync(file, { encoding: CONSTANTS.DEFAULT_ENCODING});
      return JSON.parse(content);
    } catch (e) {
      return null;
    }
  };

  const _loadFromServerConfig = function () {
    const domainHome = _parseValue(_getValue('domain.home', null));
    const domainName = _getValue('domain.name', 'domain1');
    const serverPort = parseInt(_getValue('domain.ports.base', 0)) + 21;

    settings.logFile = path.join(domainHome, domainName, 'logs', SERVER_LOG);
    settings.serverPort = serverPort;
  };

  // endregion

  if (_.has(params, 'file')) {
    const file = _.get(params, 'file');
    const fileStat = _getFileStat(file);

    if (fileStat && fileStat.isFile()) {
      if (_isServerConfig(file)) {
        serverConfig = _readJson(file);
        _loadFromServerConfig();
      }
      else if (_isServerLog(file)) {
        settings.logFile = file;
        settings.serverPort = parseInt(params.port || CONSTANTS.DEFAULT_SERVER_PORT, 10);
      }
    }
    if (fileStat && fileStat.isDirectory()) {
      if (_isServerConfig(path.join(file, SERVER_CONFIG))) {
        serverConfig = _readJson(path.join(file, SERVER_CONFIG));
        _loadFromServerConfig();
      }
      else if (_isServerLog(path.join(file, SERVER_LOG))) {
        settings.logFile = path.join(file, SERVER_LOG);
        settings.serverPort = parseInt(params.port || CONSTANTS.DEFAULT_SERVER_PORT, 10);
      }
    }
  }
  else {
    // lookup in current path
    if (_isServerConfig(path.join(currentPath, SERVER_CONFIG))) {
      serverConfig = _readJson(path.join(currentPath, SERVER_CONFIG));
      _loadFromServerConfig();
    }
    else if (_isServerLog(path.join(currentPath, SERVER_LOG))) {
      settings.logFile = path.join(currentPath, SERVER_LOG);
      settings.serverPort = parseInt(params.port || CONSTANTS.DEFAULT_SERVER_PORT, 10);
    }
  }

  if (!settings.logFile) {
    // Error: Could not found the server.log filename
    return null;
  }

  settings.format = params.format;
  settings.tailLine = parseInt(params.line || CONSTANTS.DEFAULT_TAIL_LINE, 10);

  if (!settings.format) {
    // Error: Missing format parameter!
    return null;
  }

  return settings;
}

module.exports = initialize;
