/**
 * Heringsfish Log - https://github.com/blueskyfish/heringsfish-log.git
 *
 * Copyright (c) 2017 BlueSkyFish
 */

'use strict';

const assert = require('assert');

describe('Splitter Factory > ', () => {

  const CONSTANTS = require('../hf/constants');
  const splitterUtil = require('../hf/splitter-util');

  const TEXT_JSON = `realm.file.FileRealm] successfully created."}
{"_Timestamp":"2017-03-09T21:21:20.036+0100","_Level":"INFO","_Version":"Payara 4.1","_LoggerName":"javax.enterprise.system.core.security","_ThreadID":"17","_ThreadName":"RunLevelControllerThread-1489090879147","_TimeMillis":"1489090880036","_LevelValue":"800","_MessageID":"NCLS-SECURITY-01115","_LogMessage":"Realm [admin-realm] of classtype [com.sun.enterprise.security.auth.realm.file.FileRealm] successfully created."}
{"_Timestamp":"2017-03-09T21:21:20.038+0100","_Level":"INFO","_Version":"Payara 4.1","_LoggerName":"javax.enterprise.system.core.security","_ThreadID":"17","_ThreadName":"RunLevelControllerThread-1489090879147","_TimeMillis":"1489090880038","_LevelValue":"800","_MessageID":"NCLS-SECURITY-01115","_LogMessage":"Realm [file] of classtype [com.sun.enterprise.security.auth.realm.file.FileRealm] successfully created."}
{"_Timestamp":"2017-03-09T21:21:20.047+0100","_Level":"INFO","_Version":"Payara 4.1","_LoggerName":"javax.enterprise.system.core.security","_ThreadID":"17","_ThreadName":"RunLevelControllerThread-1489090879147","_TimeMillis":"1489090880047","_LevelValue":"800","_MessageID":"NCLS-SECURITY-01115","_LogMessage":"Realm [certificate] of classtype [com.sun.enterprise.security.auth.realm.certificate.CertificateRealm] successfully created."}
{"_Timestamp":"2017-03-09T21:21:20.047+0100","_Level":"INFO",`;

  const TEXT_ODL = `1489090239280] [levelValue: 800] [[
  Virtual server server loaded default web module ]]
  
[2017-03-09T21:10:38.365+0100] [Payara 4.1] [INFO] [AS-WEB-GLUE-00200] [javax.enterprise.web] [tid: _ThreadID=76 _ThreadName=Thread-20] [timeMillis: 1489090238365] [levelValue: 800] [[
  Created virtual server __asadmin]]

[2017-03-09T21:10:39.278+0100] [Payara 4.1] [INFO] [AS-WEB-CORE-00306] [javax.enterprise.web.core] [tid: _ThreadID=76 _ThreadName=Thread-20] [timeMillis: 1489090239278] [levelValue: 800] [[
  Setting JAAS app name glassfish-web
What ever more
Multiline
etc.]]

[2017-03-09T21:10:39.280+0100] [Payara 4.1] [INFO] [AS-WEB-GLUE-00201] [javax.enterprise.web] [tid: _ThreadID=76 _ThreadName=Thread-20] [timeMillis: 1489090239280] [levelValue: 800] [[
  Virtual server server loaded default web module]]

[2017-03-09T21:10:39.278+0100] [Payara 4.1] [INFO] [AS-WEB-CORE-00306] [jav
`;

  const TEXT_UFL = `ully initialized.|#]

[#|2017-03-09T21:13:35.930+0100|INFO|Payara 4.1|javax.enterprise.security.services|_ThreadID=19;_ThreadName=RunLevelControllerThread-1489090415234;_TimeMillis=1489090415930;_LevelValue=800;_MessageID=SEC-SVCS-00100;|
  Authorization Service has successfully initialized.
Multiline
What ever
etc..|#]

[#|2017-03-09T21:13:35.967+0100|INFO|Payara 4.1|javax.enterprise.system.core.security|_ThreadID=20;_ThreadName=RunLevelControllerThread-1489090415234;_TimeMillis=1489090415967;_LevelValue=800;_MessageID=NCLS-SECURITY-01115;|
  Realm [admin-realm] of classtype [com.sun.enterprise.security.auth.realm.file.FileRealm] successfully created.|#]

[#|2017-03-09T21:13:35.968+0100|INFO|Payara 4.1|javax.enterprise.system.core.security|_ThreadID=20;_ThreadName=RunLevelControllerThread-1489090415234;_TimeMillis=1489090415968;_LevelValue=800;_MessageID=NCLS-SECURITY-01115;|
  Realm [file] of classtype [com.sun.enterprise.security.auth.realm.file.FileRealm] successfully created.|#]

[#|2017-03-09T21:13:35.968+0100|INFO|Payar
`;

  describe('DuckType the splitter RegExp > ', () => {

    it('Should define the regex for JSON', () => {
      assert.ok(CONSTANTS.SPITTER_JSON_FORMAT);
    });

    it('Should define the regex for ODL', () => {
      assert.ok(CONSTANTS.SPLITTER_ODL_FORMAT);
    });
    it('Should define the regex for UFL', () => {
      assert.ok(CONSTANTS.SPLITTER_UFL_FORMAT);
    });

  });


  describe('Split the Text in JSON, ODL and UFL > ', () => {


    it('Should split the JSON formatted data and receive event 3x', (done) => {

      let count = 0;

      const sunkFunc = (portion) => {
        count++;
        // console.log('%s -> %s', count, portion);
      };

      const worker = splitterUtil.getSplitter(CONSTANTS.FORMAT_JSON);
      worker.process(TEXT_JSON, sunkFunc, () => {
        assert.ok(count === 3);
        done();
      });

    });

    it('Should split the ODL formatted data and receive event 3x', (done) => {

      let count = 0;

      const sunkFunc = (portion) => {
        count++;
        // console.log('%s -> %s', count, portion);
      };

      const worker = splitterUtil.getSplitter(CONSTANTS.FORMAT_ODL);

       worker.process(TEXT_ODL, sunkFunc, () => {
         assert.ok(count === 3);
         done();
       });

    });

    it('Should split the UFL formatted data and receive event 3x', (done) => {

      let count = 0;

      const sunkFunc = (portion) => {
        count++;
        //console.log('%s -> %s', count, portion);
      };

      const worker = splitterUtil.getSplitter(CONSTANTS.FORMAT_UFL);

      worker.process(TEXT_UFL, sunkFunc, () => {
        assert.ok(count === 3);
        done();
      });

    });

  });

});
