/**
 * Heringsfish Log - https://github.com/blueskyfish/heringsfish-log.git
 *
 * Copyright (c) 2017 BlueSkyFish
 */

'use strict';

const assert = require('assert');

const _ = require('lodash');

describe('Parser Factory > ', () => {

  const CONSTANTS = require('../hf/constants');
  const parserUtil = require('../hf/parser-util');

  describe('DuckType > ', () => {

    it('Should known "addListener"', () => {
      assert.ok(_.isFunction(parserUtil.getParser));
    });
  });


  describe('Parse JSON Format > ', () => {

    it('Should parse JSON to LogMessage (normal)', (done) => {

      const TEXT = '{"_Timestamp":"2017-03-09T21:21:20.036+0100","_Level":"INFO","_Version":"Payara 4.1","_LoggerName":"javax.enterprise.system.core.security","_ThreadID":"17","_ThreadName":"RunLevelControllerThread-1489090879147","_TimeMillis":"1489090880036","_LevelValue":"800","_MessageID":"NCLS-SECURITY-01115","_LogMessage":"Realm [admin-realm] of classtype [com.sun.enterprise.security.auth.realm.file.FileRealm] successfully created."}';

      const sinkFunc = (logMessage) => {

        assertString(logMessage.timestamp, '-');
        assertString(logMessage.logLevel, '-');
        assertString(logMessage.version, '-');
        assertString(logMessage.logName, '-');
        assertString(logMessage.threadId, '-');
        assertString(logMessage.threadName, '-');
        assertNumber(logMessage.timeMillis, 0);
        assertNumber(logMessage.logValue, 0);
        assert.ok(_.isString(logMessage.messageId));
        assertString(logMessage.logMessage, '-');
      };

      const worker = parserUtil.getParser(CONSTANTS.FORMAT_JSON);

      worker.process(TEXT, sinkFunc, done);
    });

    it('Should parse JSON to LogMessage (with empty MessageId)', (done) => {

      const TEXT = '{"_Timestamp":"2017-03-09T21:21:20.036+0100","_Level":"INFO","_Version":"Payara 4.1","_LoggerName":"javax.enterprise.system.core.security","_ThreadID":"17","_ThreadName":"RunLevelControllerThread-1489090879147","_TimeMillis":"1489090880036","_LevelValue":"800","_LogMessage":"Realm [admin-realm] of classtype [com.sun.enterprise.security.auth.realm.file.FileRealm] successfully created."}';

      const sinkFunc = (logMessage) => {

        assertString(logMessage.timestamp, '-');
        assertString(logMessage.logLevel, '-');
        assertString(logMessage.version, '-');
        assertString(logMessage.logName, '-');
        assertString(logMessage.threadId, '-');
        assertString(logMessage.threadName, '-');
        assertNumber(logMessage.timeMillis, 0);
        assertNumber(logMessage.logValue, 0);
        assert.ok(_.isString(logMessage.messageId));
        assertString(logMessage.logMessage, '-');
      };

      const worker = parserUtil.getParser(CONSTANTS.FORMAT_JSON);

      worker.process(TEXT, sinkFunc, done);

    });

    it('Should not parse JSON to LogMessage (Error)', (done) => {

      const TEXT = '{"_Timestamp":"2017-03-09T21:21:20.036+0100,"_Level":"INFO","_Version":"Payara 4.1","_LoggerName":"javax.enterprise.system.core.security","_ThreadID":"17","_MessageID": "Logger", "_ThreadName":"RunLevelControllerThread-1489090879147","_TimeMillis":"1489090880036","_LevelValue":"800","_LogMessage":"Realm [admin-realm] of classtype [com.sun.enterprise.security.auth.realm.file.FileRealm] successfully created."}';

      const worker = parserUtil.getParser(CONSTANTS.FORMAT_JSON);

      const sinkFunc = () => {
        // will never called
        assert.ok(false);
      };

      worker.process(TEXT, sinkFunc, done);
    });

    it('Should parse JSON to LogMessage (Multiline)', (done) => {

      const TEXT = '{"_Timestamp":"2017-03-09T21:21:20.036+0100","_Level":"INFO","_Version":"Payara 4.1","_LoggerName":"javax.enterprise.system.core.security","_ThreadID":"17","_ThreadName":"RunLevelControllerThread-1489090879147","_TimeMillis":"1489090880036","_LevelValue":"800","_MessageID":"NCLS-SECURITY-01115","_LogMessage":"Realm [admin-realm] of classtype [com.sun.enterprise.security.auth.realm.file.FileRealm] successfully created.\\nThis is the second line"}';

      const sinkFunc = (logMessage) => {

        assertString(logMessage.timestamp, '-');
        assertString(logMessage.logLevel, '-');
        assertString(logMessage.version, '-');
        assertString(logMessage.logName, '-');
        assertString(logMessage.threadId, '-');
        assertString(logMessage.threadName, '-');
        assertNumber(logMessage.timeMillis, 0);
        assertNumber(logMessage.logValue, 0);
        assert.ok(_.isString(logMessage.messageId));
        assertString(logMessage.logMessage, '-');
        assert.ok(/\nThis is the second line$/gm.test(logMessage.logMessage));

      };

      const worker = parserUtil.getParser(CONSTANTS.FORMAT_JSON);

      assert.ok(worker.process(TEXT, sinkFunc, done));

    });
  });

  describe('Parse ODL Format > ', () => {

    it('Should parse ODL to LogMessage (normal)', (done) => {

      const TEXT = `
[2017-03-09T21:10:39.610+0100] [Payara 4.1] [INFO] [NCLS-SECURITY-01010] [javax.enterprise.system.core.security] [tid: _ThreadID=76 _ThreadName=Thread-20] [timeMillis: 1489090239610] [levelValue: 800] [[
  Entering Security Startup Service.]]
`;

      const sinkFunc = (logMessage) => {

        assertString(logMessage.timestamp, '-');
        assertString(logMessage.logLevel, '-');
        assertString(logMessage.version, '-');
        assertString(logMessage.logName, '-');
        assertString(logMessage.threadId, '-');
        assertString(logMessage.threadName, '-');
        assertNumber(logMessage.timeMillis, 0);
        assertNumber(logMessage.logValue, 0);
        assert.ok(_.isString(logMessage.messageId));
        assertString(logMessage.logMessage, '-');
      };

      const worker = parserUtil.getParser(CONSTANTS.FORMAT_ODL);

      worker.process(TEXT, sinkFunc, done);

    });

    it('Should parse ODL to LogMessage (with empty MessageId)', (done) => {

      const TEXT = `
[2017-03-09T21:10:39.610+0100] [Payara 4.1] [INFO] [] [javax.enterprise.system.core.security] [tid: _ThreadID=76 _ThreadName=Thread-20] [timeMillis: 1489090239610] [levelValue: 800] [[
  Entering Security Startup Service.]]
`;

      const sinkFunc = (logMessage) => {

        assertString(logMessage.timestamp, '-');
        assertString(logMessage.logLevel, '-');
        assertString(logMessage.version, '-');
        assertString(logMessage.logName, '-');
        assertString(logMessage.threadId, '-');
        assertString(logMessage.threadName, '-');
        assertNumber(logMessage.timeMillis, 0);
        assertNumber(logMessage.logValue, 0);
        assert.ok(_.isString(logMessage.messageId));
        assertString(logMessage.logMessage, '-');
      };

      const worker = parserUtil.getParser(CONSTANTS.FORMAT_ODL);

      worker.process(TEXT, sinkFunc, done);

    });

    it('Should not parse ODL to LogMessage (Error)', (done) => {

      const TEXT = `
[2017-03-09T21:10:39.610+0100] [Payara 4.1] [javax.enterprise.system.core.security] [tid: _ThreadID=76 _ThreadName=Thread-20] [timeMillis: 1489090239610] [levelValue: 800] [[
  Entering Security Startup Service.]]
`;
      const sinkFunc = (logMessage) => {
        assert.ok(false);
      };

      const worker = parserUtil.getParser(CONSTANTS.FORMAT_JSON);

      worker.process(TEXT, sinkFunc, done);

    });

    it('Should parse ODL to LogMessage (Multiline)', (done) => {

      const TEXT = `
[2017-03-09T21:10:39.610+0100] [Payara 4.1] [INFO] [NCLS-SECURITY-01010] [javax.enterprise.system.core.security] [tid: _ThreadID=76 _ThreadName=Thread-20] [timeMillis: 1489090239610] [levelValue: 800] [[
  Entering Security Startup Service.
This is the second line]]
`;

      const sinkFunc = (logMessage) => {

        assertString(logMessage.timestamp, '-');
        assertString(logMessage.logLevel, '-');
        assertString(logMessage.version, '-');
        assertString(logMessage.logName, '-');
        assertString(logMessage.threadId, '-');
        assertString(logMessage.threadName, '-');
        assertNumber(logMessage.timeMillis, 0);
        assertNumber(logMessage.logValue, 0);
        assert.ok(_.isString(logMessage.messageId));
        assertString(logMessage.logMessage, '-');
        assert.ok(/\nThis is the second line$/gm.test(logMessage.logMessage));
      };

      const worker = parserUtil.getParser(CONSTANTS.FORMAT_ODL);

      worker.process(TEXT, sinkFunc, done);

    });
  });

  describe('Parse UFL Format > ', () => {

    it('Should parse UFL to LogMessage (normal)', (done) => {

      const TEXT = `
[#|2017-03-09T21:13:35.367+0100|INFO|Payara 4.1|javax.enterprise.logging|_ThreadID=18;_ThreadName=RunLevelControllerThread-1489090415224;_TimeMillis=1489090415367;_LevelValue=800;_MessageID=NCLS-LOGGING-00010;|
  Server log file is using Formatter class: com.sun.enterprise.server.logging.UniformLogFormatter|#]
`;

      const sinkFunc = (logMessage) => {

        assertString(logMessage.timestamp, '-');
        assertString(logMessage.logLevel, '-');
        assertString(logMessage.version, '-');
        assertString(logMessage.logName, '-');
        assertString(logMessage.threadId, '-');
        assertString(logMessage.threadName, '-');
        assertNumber(logMessage.timeMillis, 0);
        assertNumber(logMessage.logValue, 0);
        assert.ok(_.isString(logMessage.messageId));
        assertString(logMessage.logMessage, '-');
      };

      const worker = parserUtil.getParser(CONSTANTS.FORMAT_UFL);

      worker.process(TEXT, sinkFunc, done);

    });

    it('Should parse UFL to LogMessage (with empty MessageId)', (done) => {

      const TEXT = `
[#|2017-03-09T21:13:35.367+0100|INFO|Payara 4.1|javax.enterprise.logging|_ThreadID=18;_ThreadName=RunLevelControllerThread-1489090415224;_TimeMillis=1489090415367;_LevelValue=800;_MessageID=;|
  Server log file is using Formatter class: com.sun.enterprise.server.logging.UniformLogFormatter|#]
`;

      const sinkFunc = (logMessage) => {

        assertString(logMessage.timestamp, '-');
        assertString(logMessage.logLevel, '-');
        assertString(logMessage.version, '-');
        assertString(logMessage.logName, '-');
        assertString(logMessage.threadId, '-');
        assertString(logMessage.threadName, '-');
        assertNumber(logMessage.timeMillis, 0);
        assertNumber(logMessage.logValue, 0);
        assert.ok(_.isString(logMessage.messageId));
        assertString(logMessage.logMessage, '-');
      };

      const worker = parserUtil.getParser(CONSTANTS.FORMAT_UFL);

      worker.process(TEXT, sinkFunc, done);

    });

    it('Should not parse UFL to LogMessage (Error)', (done) => {

      const TEXT = `
[#|2017-03-09T21:13:35.367+0100|INFO|Payara 4.1|javax.enterprise.loggingRunLevelControllerThread-1489090415224;_TimeMillis=1489090415367;_LevelValue=800;_MessageID=NCLS-LOGGING-00010;|
  Server log file is using Formatter class: com.sun.enterprise.server.logging.UniformLogFormatter|#]
`;

      const sinkFunc = (logMessage) => {
        assert.ok(false);
      };

      const worker = parserUtil.getParser(CONSTANTS.FORMAT_UFL);

      worker.process(TEXT, sinkFunc, done);

    });

    it('Should parse UFL to LogMessage (Multiline)', (done) => {

      const TEXT = `
[#|2017-03-09T21:13:35.367+0100|INFO|Payara 4.1|javax.enterprise.logging|_ThreadID=18;_ThreadName=RunLevelControllerThread-1489090415224;_TimeMillis=1489090415367;_LevelValue=800;_MessageID=NCLS-LOGGING-00010;|
  Server log file is using Formatter class: com.sun.enterprise.server.logging.UniformLogFormatter
This is the second line|#]
`;

      const sinkFunc = (logMessage) => {

        assertString(logMessage.timestamp, '-');
        assertString(logMessage.logLevel, '-');
        assertString(logMessage.version, '-');
        assertString(logMessage.logName, '-');
        assertString(logMessage.threadId, '-');
        assertString(logMessage.threadName, '-');
        assertNumber(logMessage.timeMillis, 0);
        assertNumber(logMessage.logValue, 0);
        assert.ok(_.isString(logMessage.messageId));
        assertString(logMessage.logMessage, '-');
        assert.ok(/\nThis is the second line$/gm.test(logMessage.logMessage));
      };

      const worker = parserUtil.getParser(CONSTANTS.FORMAT_UFL);

      worker.process(TEXT, sinkFunc, done);

    });
  });


  function assertString(value, notValue) {
    assert.ok(_.isString(value) && value !== notValue);
  }

  function assertNumber(value, notValue) {
    const no = parseInt(value, 10);
    assert.ok(!isNaN(no) && value !== notValue);
  }

});
