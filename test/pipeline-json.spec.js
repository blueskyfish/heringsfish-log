/**
 * Heringsfish Log - https://github.com/blueskyfish/heringsfish-log.git
 *
 * Copyright (c) 2017 BlueSkyFish
 */

'use strict';

const assert = require('assert');
const Readable = require('stream').Readable;
const Writable = require('stream').Writable;

const CONSTANTS = require('../hf/constants');

describe('Define a Pipeline for JSON log messages >', () => {

  const splitter = require('../hf/splitter-stream');
  const parser = require('../hf/parser-stream');

  class ConsoleWritable extends Writable {

    constructor(options) {
      super(options);
    }

    _write(data, encoding, done) {
      console.log('Result: \n%s\n---------', JSON.stringify(data, null, 2));
      done();
    }
  }

  it('Should process', (done) => {

    /** @type {ParserOptions|SplitterOptions} */
    const options = {
      format: CONSTANTS.FORMAT_JSON,
      async: true
    };


    const reader = new Readable({objectMode: true});
    const writer = new ConsoleWritable({objectMode: true});

    reader.on('end', () => {
      console.log('reader Finish');
      done();
    });

    reader
      .pipe(splitter(options))
      .pipe(parser(options))
      .pipe(writer);

    reader.push('his is a part"}\n');
    reader.push('{"_Timestamp":"2017-03-09T21:21:20.036+0100","_Level":"INFO","_Version":"Payara 4.1","_LoggerName":"javax.enterprise.system.core.security","_ThreadID":"17","_ThreadName":"RunLevelControllerThread-1489090879147","_TimeMillis":"1489090880036","_LevelValue":"800","_MessageID":"NCLS-SECURITY-01115","_LogMessage":"1. Realm [admin-realm] of classtype [com.sun.enterprise.security.auth.realm.file.FileRealm] successfull');
    reader.push('y created."}\n{"_Timestamp":"2017-03-09T21:21:20.038+0100","_Level":"INFO","_Version":"Payara 4.1","_LoggerName":"javax.enterprise.system.core.security","_ThreadID":"17","_ThreadName":"RunLevelControllerThread-1489090879147","_TimeMillis":"1489090880038","_LevelValue":"800","_MessageID":"NCLS-SECURITY-01115","_LogMessage":"2. Realm [file] of classtype [com.sun.enterprise.security.auth.realm.file.FileRealm] successfully created."}\n{"_Timestamp":"2017-03-09T21:21:20.047+0100","_Level":"INFO","_Version":"Payara 4');
    reader.push('.1","_LoggerName":"javax.enterprise.system.core.security","_ThreadID":"17","_ThreadName":"RunLevelControllerThread-1489090879147","_TimeMillis":"1489090880047","_LevelValue":"800","_MessageID":"NCLS-SECURITY-01115","_LogMessage":"3. Realm [certificate] of classtype [com.sun.enterprise.security.auth.realm.certificate.CertificateRealm] successfully created.\\nThe second line"}');
    reader.push('{"...');
    reader.push(null);

  });
});

