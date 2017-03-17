/*!
 * Heringsfish Log Client - https://github.com/blueskyfish/heringsfish-log-client.git
 *
 * The small browser client for the Payara (or Glassfish) application server.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 BlueSkyFish
 */

export interface IServerConfig {
  readonly serverLog: String;
  readonly domainName: String;
}

export class ServerConfig implements IServerConfig {

  readonly serverLog: String;
  readonly domainName: String;

  constructor(serverLog?: String, domainName?: String) {
    this.serverLog = serverLog || '-';
    this.domainName = domainName || '-';
  }
}
