/*!
 * Heringsfish Log Client - https://github.com/blueskyfish/heringsfish-log-client.git
 *
 * The small browser client for the Payara (or Glassfish) application server.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 BlueSkyFish
 */

import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class SettingService {

  private _mLogSettings: { [index: string] : LogSettingItem } = {};

  private _changeVisibleColumns: EventEmitter<string[]> = new EventEmitter(true);

  private _maxRows: number = 1000;
  private _changeMaxRows: EventEmitter<number> = new EventEmitter(true);

  private _clearTable: EventEmitter<any> = new EventEmitter(true);


  constructor() {
    this.addColumn('no', true, '#');
    this.addColumn('timestamp', true, 'Timestamp');
    this.addColumn('timeMillis', false, 'Time in Milliseconds');
    this.addColumn('logLevel', true, 'Log Level');
    this.addColumn('logValue', false, 'Log Value');
    this.addColumn('logName', true, 'Log Name');
    this.addColumn('threadId', true, 'Thread ID');
    this.addColumn('threadName', false, 'Thread Name');
    this.addColumn('messageId', false, 'Message ID');
    this.addColumn('logMessage', true, 'Message');
  }

  isColumnShow(name: string): boolean {
    const s: LogSettingItem = this.getColumn(name);
    return s != null ? s.show : false;
  }

  setColumnShow(name: string, show: boolean) {
    const s: LogSettingItem = this.getColumn(name);
    if (s) {
      s.show = show;
    }
  }

  getColumnTitle(name: string): string {
    const s: LogSettingItem = this.getColumn(name);
    return s != null ? s.title : null;
  }

  getColumn(name: string): LogSettingItem {
    if (this._mLogSettings.hasOwnProperty(name)) {
      return this._mLogSettings[name];
    }
    return null;
  }

  addColumn(name: string, show: boolean, title: string) {
    this._mLogSettings[name] = new LogSettingItem(name, show, title);
  }

  getAllColumnNames(): Array<string> {
    const names: Array<string> = [];
    for (let name in this._mLogSettings) {
      if (this._mLogSettings.hasOwnProperty(name)) {
        names.push(name);
      }
    }
    return names;
  }

  updateMaxCount(maxCount: number) {
    if (this._maxRows != maxCount) {
      this._maxRows = maxCount;
      this.submitMaxCount();
    }
  }

  submitMaxCount() {
    this._changeMaxRows.next(this._maxRows);
  }

  updateVisibleColumns() {
    const names: string[] = this._getAllVisibleColumnNames();
    this._changeVisibleColumns.emit(names);
  }

  private _getAllVisibleColumnNames(): Array<string> {
    const names: Array<string> = [];
    for (let name in this._mLogSettings) {
      if (this.isColumnShow(name)) {
        names.push(name);
      }
    }
    return names;
  }

  addMaxRowsListener(callback: ICallback<number>): void {
    this._changeMaxRows.subscribe((maxRows: number) => {
      callback(maxRows);
    });
    callback(this._maxRows);
  }

  addVisibleColumnListener(callback: ICallback<string[]>): void {
    this._changeVisibleColumns.subscribe((columnNames: string[]) => {
      callback(columnNames);
    });
    const tempNames: string[] = this._getAllVisibleColumnNames();
    callback(tempNames);
  }

  addClearTableListener(callback: ICallback<any>): void {
    this._clearTable.subscribe((value: any) => {
      callback(value);
    });
  }

  public submitClearTable() {
    this._clearTable.emit(1);
  }

}

export class LogSettingItem {

  constructor(public name: string, public show: boolean, public title: string) {}

  static isNoColumn(name) {
    return name === 'no';
  }
}
