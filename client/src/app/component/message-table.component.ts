/*
 * Heringsfish Log Client - https://github.com/blueskyfish/heringsfish-log-client.git
 *
 * The small browser client for the Payara (or Glassfish) application server.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 BlueSkyFish
 */

import {Component, OnInit} from '@angular/core';
import {SettingService, LogSettingItem} from "../service/setting.service";
import {ILogEntry} from "../shared/log-entry";
import {SocketService} from "../service/socket.service";

@Component({
  selector: 'app-message-table',
  templateUrl: './message-table.component.html',
  styleUrls: ['message-table.component.less']
})
export class MessageTableComponent implements OnInit {

  private logNames: Array<string> = [];

  private maxRows: number = 0;

  private logMessages: Array<MessageItem> = [];

  constructor(private settingService: SettingService, private socketService: SocketService) { }

  ngOnInit() {

    this.settingService.addVisibleColumnListener((names: string[]) => {
      this.logNames = names;
      console.log('Log Names: %s', JSON.stringify(this.logNames));
    });

    this.settingService.addMaxRowsListener((maxRows) => {
      this.maxRows = maxRows;
      console.log('MaxCount %s', this.maxRows);
    });

    this.socketService.addMessageListener((logEntry: ILogEntry) => {

      this.logMessages.unshift(MessageTableComponent.buildMessageItem(logEntry));

      if (this.logMessages.length > this.maxRows) {
        while (this.logMessages.length > this.maxRows) {
          this.logMessages.pop();
        }
      }
    });

    this.settingService.addClearTableListener((t) => {
      this.logMessages = [];
      console.log('Clear Log Messages');
    });
  }

  getColumnTitle(name: string): string {
    return this.settingService.getColumnTitle(name);
  }

  getColumnValue(index: number, item: MessageItem, name: string): any {
    if (LogSettingItem.isNoColumn(name)) {
      return this.logMessages.length - index;
    }
    return item.getValue(name);
  }

  static buildMessageItem(logMessage: ILogEntry): MessageItem {
    const item: MessageItem = new MessageItem(logMessage);

    return item;
  }
}

/*
 [2017-03-01T13:00:41.102+0100] [Payara 4.1] [INFO] [NCLS-LOGGING-00009] [javax.enterprise.logging] [tid: _ThreadID=18 _ThreadName=RunLevelControllerThread-1488369640990] [timeMillis: 1488369641102] [levelValue: 800] [[
 Running Payara Version: Payara Server  4.1.1.164 #badassfish (build 28)]]

 */

export class MessageItem {

  constructor(public message: ILogEntry) {}

  getValue(name: string): any {
    return this.message.get(name);
  }

  getStyle(name: string): string {
    if (!name) {
      return 'message-column';
    }
    return 'message-column-' + name.toLowerCase();
  }
}
