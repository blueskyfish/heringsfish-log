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

const DEFAULT_PORT = 4201;

/**
 * @name ApplicationOptions
 * @property {number} port the server port
 * @property {string} file the server log file for tailing
 * @property {number} [line] the last line of the file
 * @property {string} format the format of the server log (json, odl or ulf)
 */

/**
 *
 */
class Server {

  constructor() {
    this.app = express();
    this.http = require('http').Server(this.app);
    this.io = require('socket.io')(this.http);
  }

  init(projectPath, currentPath, options) {

    // socket io
    this.io.on('connection', (socket) => {

      // TODO info message of the socket !!

      // TODO send configuration and info to the client
      // socket.emit('config', {});

      socket.on('disconnect', () => {

        // TODO info message -> user is disconnected
      });
    });

    this.app.use('/app', express.static(path.join(projectPath, '/app')));

    this.app.get('/', (req, res) => {
      res.redirect('/app/index.html');
    });

    /**
     * @type {TailOptions}
     */
    this.tailOptions = {
      file: options.file,
      line: options.line,
      cwd: currentPath,
      env: process.env
    };

    /**
     * @type {SplitterOptions}
     */
    this.splitterOptions = {
      format: options.format
    };

    /**
     * @type {ParserOptions}
     */
    this.parserOptions = {
      format: options.format
    };

    /**
     * @type {SocketOptions}
     */
    this.socketOptions = {
      server: this.io,
      event: 'message'
    };
  }

  run(port) {

    tail(this.tailOptions)
      //.pipe(new Destination({}))
      .pipe(splitter(this.splitterOptions))
      //.pipe(new Destination({objectMode: true}))
      .pipe(parser(this.parserOptions))
      //.pipe(new Destination({objectMode: true}))
      .pipe(socket(this.socketOptions));

    port = port || DEFAULT_PORT;

    this.http.listen(port, () => {
      logger.info('Server listen on http://localhost:%s', port);
    });
  }
}

/**
 *
 */
class Destination extends Transform {

  constructor(options) {
    super(options);
  }

  _transform(data, encoding, done) {
    if (data instanceof Buffer) {
      data = data.toString();
    }
    if (typeof data === 'object') {
      data = JSON.stringify(data, null, 2);
    }
    console.log('Result: \n%s\n---------', data);
    this.push(data);
    done();
  }
}

/**
 * Executes the server
 *
 * @param {string} projectPath
 * @param {string} currentPath the current working directory
 * @param {ApplicationOptions} options
 */
module.exports.run = function (projectPath, currentPath, options) {

  const port = parseInt(options.port || DEFAULT_PORT, 10);

  const server = new Server();

  server.init(projectPath, currentPath, options);
  server.run(port);

};
