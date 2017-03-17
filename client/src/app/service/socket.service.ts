/*!
 * Heringsfish Log Client - https://github.com/blueskyfish/heringsfish-log-client.git
 *
 * The small browser client for the Payara (or Glassfish) application server.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 BlueSkyFish
 */

import {Injectable, Inject, EventEmitter} from '@angular/core';

import { environment } from '../../environments/environment';

import * as io from 'socket.io-client';

import { LogEntry, ILogEntry } from "../shared/log-entry";

@Injectable()
export class SocketService {

  private _socketUrl = null;
  private _socket = null;
  private _socketCount: number;
  private _socketOpen: boolean = false;

  private _receiveMessage: EventEmitter<any> = new EventEmitter(true);

  constructor(@Inject('Window') window: any) {
    this._socketUrl = SocketService.buildSocketUrl(window);
    this._socketCount = 0;
    console.info('SocketURL %s', this._socketUrl);
  }

  public isSocketOpen() : boolean {
    return this._socketOpen;
  }

  public start() {
    this.checkSocket();
    this._socket.open();
    this._socket.connect();
    this._socketOpen = true;
  }

  public pause() {
    this.checkSocket();
    this._socket.disconnect();
    this._socketOpen = false;
  }

  addMessageListener(callback: ICallback<ILogEntry>): void {
    this.checkSocket();
    this._receiveMessage.subscribe((logEntry: ILogEntry) => {
      callback(logEntry);
    });
  }

  private checkSocket(): void {
    if (!this._socket) {

      // reconnect !!
      this._socket = io(this._socketUrl, {
        autoConnect: false
      });
      this._socketCount = 0;

      // socket event "message"....
      this._socket.on('message', (data) => {

        // console.log('Receive LogEntry: %s', JSON.stringify(data));

        const logEntry: ILogEntry = new LogEntry(data.timestamp, data.timeMillis,
          data.logLevel, data.logValue, data.logName, data.threadId, data.threadName,
          data.messageId, data.logMessage);

        this._receiveMessage.emit(logEntry);
      });
    }
  }

  private releaseSocket(): void {
    if (this._socketCount > 0) {
      this._socketCount--;
      if (this._socketCount === 0) {
        this._socket.disconnect();
        this._socket = null;
      }
    }
  }


  private static buildSocketUrl(window: any): String {
    if (environment.socketUrl) {
      return environment.socketUrl;
    }

    const l: Location = window.location || {};
    const port: number = window.socketPort || 5000;

    return (l.protocol || 'http') + "//" + (l.hostname || 'localhost') + ":" + port;
  }
}
