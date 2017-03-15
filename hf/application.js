/**
 * Heringsfish Log - https://github.com/blueskyfish/heringsfish-log.git
 *
 * Copyright (c) 2017 BlueSkyFish
 */

'use strict';

const path     = require('path');
const Transform = require('stream').Transform;


const express  = require('express');

const logger   = require('./logger');
const tail     = require('./tail-stream');
const splitter = require('./splitter-stream');
const parser   = require('./parser-stream');
const socket   = require('./socket-stream');
const verbose  = require('./verbose-stream');

/**
 * Start the application.
 *
 * @param {string} projectPath
 * @param {string} currentPath
 * @param {Settings} settings
 */
function startApp(projectPath, currentPath, settings) {

  const port = settings.serverPort;

  const app = express();
  const http = require('http').Server(app);
  const io = require('socket.io')(http);

  // socket io
  io.on('connection', (socket) => {

    // TODO info message of the socket !!

    // TODO send configuration and info to the client
    // socket.emit('config', {});

    socket.on('disconnect', () => {

      // TODO info message -> user is disconnected
    });
  });

  app.use('/app', express.static(path.join(projectPath, '/app')));

  app.get('/', (req, res) => {
    res.redirect('/app/index.html');
  });

  /**
   * @type {TailOptions}
   */
  const tailOptions = {
    file: settings.logFile,
    line: settings.tailLine,
    cwd: currentPath,
    env: process.env
  };

  /**
   * @type {SplitterOptions}
   */
  const splitterOptions = {
    format: settings.format
  };

  /**
   * @type {ParserOptions}
   */
  const parserOptions = {
    format: settings.format
  };

  /**
   * @type {SocketOptions}
   */
  const socketOptions = {
    server: io,
    event: 'message'
  };

  tail(tailOptions)
    .pipe(verbose({ objectMode: false }))
    .pipe(splitter(splitterOptions))
    .pipe(verbose({ objectMode: false }))
    .pipe(parser(parserOptions))
    .pipe(verbose({ objectMode: false }))
    .pipe(socket(socketOptions));


  http.listen(port, () => {
    logger.info('HF Log Server is listening http://localhost:%s', port);
  });
}

module.exports = startApp;
