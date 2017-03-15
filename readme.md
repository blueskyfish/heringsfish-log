
![Heringsfish Log](logo.png)

# Heringsfish Log

> A small tool for watch the server log from Payara / Glassfish application server. It works together with [heringsfish-cli](https://github.com/blueskyfish/heringsfish-cli).

## Table of Content

* [Installation](#user-content-installation)
* [Usage](#user-content-usage)
* [Config over server-config.json](#user-content-config-over-server-config-json)
* [Log Formats](#user-content-log-formats)
    * [(ODL) Oracle Diagnostics Logging](#user-content-odl-oracle-diagnostics-logging)
    * [(ULF) Unified Logging Format](#user-content-ulf-unified-logging-format)
    * [(JSON) Json Format](#user-content-json-json-format)
* [History](#user-content-history)
* [License](#user-content-license)
* [Third Party](#user-content-third-party)


## Installation

```bash
$ npm install -global heringsfish-log
```

## Usage

* without arguments:<br>
  The `hflog` search in the current working directory to file `server-config.json` or `server.log`.
* `--port=xxx`<br>
  The server port for the browser (e.g `--port=30000` -&gt; http://localhost:30000)
* `--file=/path/to/server.log`<br>
  The file name of the `server.log`.
* `--format=xxx`<br>
  The format of the `server.log` file.
    * **json** every line is a valid json
    * **odl** Oracle Diagnostic Logging
    * **ulf** Unified Logging Format

The `hflog` can startet on two manner:

1. With Heringsfish-Cli together<br>
   It use the file `server-config.json` for getting the information.

```bash
$ cd /path/of/heringsfish-cli/project
$ hflog
> Heringsfish Log is startet at http://localhost:40000
$ open "http://localhost:40000/"
```

2. Single Mode<br>
   All arguments are required

```bash
$ hflog --port=40000 --file=/path/to/server.log --format=odl
```

## Config over `server-config.json`

Starting the `hflog` in a directory that contain a heringsfish cli configuration (a file `server-config.json`), it reads
all parameters from the configuration.

* Find the port for the browser location from the property `domain.ports.base` + 21 in the `server-config.json`.
* Find the file `server.log` from the properties `domain.home` + `domain.name` in the `server-config.json`.

**Example**

```json
{
  "name": "demo-service",
  ...
  "domain": {
    "home": "{user.home}/var/domains",
    "name": "demo",
    "ports": {
      "base": "10000"
    }
  }
  ...
}
```

* Browser <http://localhost:10021>
* Watch the file `{user.home}/var/domains/demo/logs/server.log`.

## Log Formats

The Payara or Glassfish Application Server knowns 3 formats for the logging.

* (ODL) Oracle Diagnostics Logging
* (ULF) Uniform Log Formatter
* (JSON) Json Format (*Payara Application Server only from version 4.1.1.164*)


### (ODL) Oracle Diagnostics Logging

```
[yyyy-mm-ddThh:mm:ss.SSS-Z][ProductName-Version][Log Level] [Message ID] [LoggerName] [ThreadId + Name] [timeMillis] [LogValue] [[
  Message]]
```

**Fields**

1. Timestamp
1. ProductName + Version
1. LogLevel
1. Message ID
1. LogName
1. Thread ID + Name
1. TimeMillis
1. Log Value
1. Message


**Example**

```text
[2017-03-09T21:10:38.365+0100] [Payara 4.1] [INFO] [AS-WEB-GLUE-00200] [javax.enterprise.web] [tid: _ThreadID=76 _ThreadName=Thread-20] [timeMillis: 1489090238365] [levelValue: 800] [[
  Created virtual server __asadmin]]

[2017-03-09T21:10:39.278+0100] [Payara 4.1] [INFO] [AS-WEB-CORE-00306] [javax.enterprise.web.core] [tid: _ThreadID=76 _ThreadName=Thread-20] [timeMillis: 1489090239278] [levelValue: 800] [[
  Setting JAAS app name glassfish-web]]

[2017-03-09T21:10:39.280+0100] [Payara 4.1] [INFO] [AS-WEB-GLUE-00201] [javax.enterprise.web] [tid: _ThreadID=76 _ThreadName=Thread-20] [timeMillis: 1489090239280] [levelValue: 800] [[
  Virtual server server loaded default web module ]]

[2017-03-09T21:10:39.610+0100] [Payara 4.1] [INFO] [NCLS-SECURITY-01002] [javax.enterprise.system.core.security] [tid: _ThreadID=76 _ThreadName=Thread-20] [timeMillis: 1489090239610] [levelValue: 800] [[
  Java security manager is disabled.]]

[2017-03-09T21:10:39.610+0100] [Payara 4.1] [INFO] [NCLS-SECURITY-01010] [javax.enterprise.system.core.security] [tid: _ThreadID=76 _ThreadName=Thread-20] [timeMillis: 1489090239610] [levelValue: 800] [[
  Entering Security Startup Service.]]

[2017-03-09T21:10:39.614+0100] [Payara 4.1] [INFO] [NCLS-SECURITY-01143] [javax.enterprise.system.core.security] [tid: _ThreadID=76 _ThreadName=Thread-20] [timeMillis: 1489090239614] [levelValue: 800] [[
  Loading policy provider com.sun.enterprise.security.provider.PolicyWrapper.]]

[2017-03-09T21:10:39.679+0100] [Payara 4.1] [INFO] [NCLS-SECURITY-01011] [javax.enterprise.system.core.security] [tid: _ThreadID=76 _ThreadName=Thread-20] [timeMillis: 1489090239679] [levelValue: 800] [[
  Security Service(s) started successfully.]]

[2017-03-09T21:10:42.262+0100] [Payara 4.1] [INFO] [jsf.config.listener.version] [javax.enterprise.resource.webcontainer.jsf.config] [tid: _ThreadID=76 _ThreadName=Thread-20] [timeMillis: 1489090242262] [levelValue: 800] [[
  Mojarra 2.2.13 ( 20160203-1910 unable to get svn info) für Kontext '' wird initialisiert.]]
```


### (ULF) Unified Logging Format


```
[#|yyyy-mm-ddThh:mm:ss.SSS-Z|Log Level|ProductName-Version|LogName|_ThreadID;_ThreadName;_TimeMilli;_LevelValue;_MessageID|
  Message|#]
```

**Fields**

1. Timestamp
1. ProductName + Version
1. LogLevel
1. Message ID
1. LogName
1. Thread ID + Name
1. TimeMillis
1. Log Value
1. Message


**Example**

```text
[#|2017-03-09T21:13:35.367+0100|INFO|Payara 4.1|javax.enterprise.logging|_ThreadID=18;_ThreadName=RunLevelControllerThread-1489090415224;_TimeMillis=1489090415367;_LevelValue=800;_MessageID=NCLS-LOGGING-00010;|
  Server log file is using Formatter class: com.sun.enterprise.server.logging.UniformLogFormatter|#]

[#|2017-03-09T21:13:35.633+0100|INFO|Payara 4.1|org.glassfish.ha.store.spi.BackingStoreFactoryRegistry|_ThreadID=20;_ThreadName=RunLevelControllerThread-1489090415234;_TimeMillis=1489090415633;_LevelValue=800;|
  Registered org.glassfish.ha.store.adapter.cache.ShoalBackingStoreProxy for persistence-type = replicated in BackingStoreFactoryRegistry|#]

[#|2017-03-09T21:13:35.930+0100|INFO|Payara 4.1|javax.enterprise.security.services|_ThreadID=19;_ThreadName=RunLevelControllerThread-1489090415234;_TimeMillis=1489090415930;_LevelValue=800;_MessageID=SEC-SVCS-00100;|
  Authorization Service has successfully initialized.|#]

[#|2017-03-09T21:13:35.967+0100|INFO|Payara 4.1|javax.enterprise.system.core.security|_ThreadID=20;_ThreadName=RunLevelControllerThread-1489090415234;_TimeMillis=1489090415967;_LevelValue=800;_MessageID=NCLS-SECURITY-01115;|
  Realm [admin-realm] of classtype [com.sun.enterprise.security.auth.realm.file.FileRealm] successfully created.|#]

[#|2017-03-09T21:13:35.968+0100|INFO|Payara 4.1|javax.enterprise.system.core.security|_ThreadID=20;_ThreadName=RunLevelControllerThread-1489090415234;_TimeMillis=1489090415968;_LevelValue=800;_MessageID=NCLS-SECURITY-01115;|
  Realm [file] of classtype [com.sun.enterprise.security.auth.realm.file.FileRealm] successfully created.|#]

[#|2017-03-09T21:13:35.977+0100|INFO|Payara 4.1|javax.enterprise.system.core.security|_ThreadID=20;_ThreadName=RunLevelControllerThread-1489090415234;_TimeMillis=1489090415977;_LevelValue=800;_MessageID=NCLS-SECURITY-01115;|
  Realm [certificate] of classtype [com.sun.enterprise.security.auth.realm.certificate.CertificateRealm] successfully created.|#]

[#|2017-03-09T21:13:36.006+0100|INFO|Payara 4.1|org.glassfish.ha.store.spi.BackingStoreFactoryRegistry|_ThreadID=19;_ThreadName=RunLevelControllerThread-1489090415234;_TimeMillis=1489090416006;_LevelValue=800;|
  Registered fish.payara.ha.hazelcast.store.HazelcastBackingStoreFactoryProxy for persistence-type = hazelcast in BackingStoreFactoryRegistry|#]

[#|2017-03-09T21:13:36.008+0100|INFO|Payara 4.1|fish.payara.ha.hazelcast.store.HazelcastBackingStoreFactory|_ThreadID=19;_ThreadName=RunLevelControllerThread-1489090415234;_TimeMillis=1489090416008;_LevelValue=800;|
  Registered Hazelcast BackingStoreFactory with persistence-type = hazelcast|#]
```

### (JSON) Json Format

**Example**

```text
{"_Timestamp":"2017-03-09T21:21:20.036+0100","_Level":"INFO","_Version":"Payara 4.1","_LoggerName":"javax.enterprise.system.core.security","_ThreadID":"17","_ThreadName":"RunLevelControllerThread-1489090879147","_TimeMillis":"1489090880036","_LevelValue":"800","_MessageID":"NCLS-SECURITY-01115","_LogMessage":"Realm [admin-realm] of classtype [com.sun.enterprise.security.auth.realm.file.FileRealm] successfully created."}
{"_Timestamp":"2017-03-09T21:21:20.038+0100","_Level":"INFO","_Version":"Payara 4.1","_LoggerName":"javax.enterprise.system.core.security","_ThreadID":"17","_ThreadName":"RunLevelControllerThread-1489090879147","_TimeMillis":"1489090880038","_LevelValue":"800","_MessageID":"NCLS-SECURITY-01115","_LogMessage":"Realm [file] of classtype [com.sun.enterprise.security.auth.realm.file.FileRealm] successfully created."}
{"_Timestamp":"2017-03-09T21:21:20.047+0100","_Level":"INFO","_Version":"Payara 4.1","_LoggerName":"javax.enterprise.system.core.security","_ThreadID":"17","_ThreadName":"RunLevelControllerThread-1489090879147","_TimeMillis":"1489090880047","_LevelValue":"800","_MessageID":"NCLS-SECURITY-01115","_LogMessage":"Realm [certificate] of classtype [com.sun.enterprise.security.auth.realm.certificate.CertificateRealm] successfully created."}
{"_Timestamp":"2017-03-09T21:21:20.080+0100","_Level":"INFO","_Version":"Payara 4.1","_LoggerName":"org.glassfish.ha.store.spi.BackingStoreFactoryRegistry","_ThreadID":"18","_ThreadName":"RunLevelControllerThread-1489090879149","_TimeMillis":"1489090880080","_LevelValue":"800","_LogMessage":"Registered fish.payara.ha.hazelcast.store.HazelcastBackingStoreFactoryProxy for persistence-type = hazelcast in BackingStoreFactoryRegistry"}
{"_Timestamp":"2017-03-09T21:21:20.081+0100","_Level":"INFO","_Version":"Payara 4.1","_LoggerName":"fish.payara.ha.hazelcast.store.HazelcastBackingStoreFactory","_ThreadID":"18","_ThreadName":"RunLevelControllerThread-1489090879149","_TimeMillis":"1489090880081","_LevelValue":"800","_LogMessage":"Registered Hazelcast BackingStoreFactory with persistence-type = hazelcast"}
{"_Timestamp":"2017-03-09T21:21:20.175+0100","_Level":"INFO","_Version":"Payara 4.1","_LoggerName":"javax.enterprise.system.core","_ThreadID":"20","_ThreadName":"RunLevelControllerThread-1489090879160","_TimeMillis":"1489090880175","_LevelValue":"800","_MessageID":"NCLS-CORE-00087","_LogMessage":"Grizzly Framework 2.3.28 started in: 50ms - bound to [\/0.0.0.0:48080]"}
```

## History

| Date       | Version  | Description
|------------|:--------:|--------------------------------------------------------
| 2017-03-13 | 0.0.1    | Initial commit<br>Missing Evaluate the parameters<br>Missing frontend

## License

```
The MIT License (MIT)

Copyright (c) 2017 BlueSkyFish

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

## Third Party

All company, brand and product names are trademarks of their respective owners.
