/*!
 * Heringsfish Log Client - https://github.com/blueskyfish/heringsfish-log-client.git
 *
 * The small browser client for the Payara (or Glassfish) application server.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 BlueSkyFish
 */

export interface ILogEntry {
  readonly timestamp: string;
  readonly timeMillis: number;
  readonly logLevel: string;
  readonly logValue: number;
  readonly logName: string;
  readonly threadId: string;
  readonly threadName: string;
  readonly messageId: string;
  readonly logMessage: string;
  get(name: string): any;
}

export class LogEntry implements ILogEntry {

  readonly timestamp: string;
  readonly timeMillis: number;
  readonly logLevel: string;
  readonly logValue: number;
  readonly logName: string;
  readonly threadId: string;
  readonly threadName: string;
  readonly messageId: string;
  readonly logMessage: string;

  constructor(timestamp?: string, timeMillis?: number, logLevel?: string, logValue?: number,
              logName?: string, threadId?: string, threadName?: string, messageId?: string,
              logMessage?: string)
  {
    this.timestamp = timestamp || '-';
    this.timeMillis = timeMillis || -1;
    this.logLevel = logLevel || '-';
    this.logValue = logValue || 0;
    this.logName = logName || '-';
    this.threadId = threadId || '-';
    this.threadName = threadName || '-';
    this.messageId = messageId || '-';
    this.logMessage = logMessage || '-';
  }

  public get(name: string): any {
    if (typeof this[name] != 'undefined') {
      return this[name];
    }
    return null;
  }
}
