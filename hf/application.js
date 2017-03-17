/**
 * Heringsfish Log - https://github.com/blueskyfish/heringsfish-log.git
 *
 * Copyright (c) 2017 BlueSkyFish
 */

'use strict';

const path     = require('path');
const Transform = require('stream').Transform;


const express  = require('express');
const nunjucks = require('nunjucks');

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

    logger.info('User connect (%s)', socket);

    socket.on('disconnect', () => {

      logger.info('User disconnect');

    });
  });

  nunjucks.configure(path.join(projectPath, 'app'), {
    autoescape: true,
    express: app
  });

  app.get('/', (req, res) => {
    res.redirect('/app/index.html');
  });

  app.get('/app/index.html', (req, res) => {
    res.render('index.html', {
      severPort: settings.serverPort
    });
  });

  // client sources in location "/app"
  app.use('/app', express.static(path.join(projectPath, 'app')));

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
