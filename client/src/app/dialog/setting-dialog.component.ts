/*
 * Heringsfish Log Client - https://github.com/blueskyfish/heringsfish-log-client.git
 *
 * The small browser client for the Payara (or Glassfish) application server.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 BlueSkyFish
 */

import {Component, OnInit, AfterViewInit} from '@angular/core';
import { IDialog } from "./dialog.interface";
import {SettingService, LogSettingItem} from "../service/setting.service";

@Component({
  selector: 'app-setting-dialog',
  templateUrl: './setting-dialog.component.html',
  styleUrls: ['./setting-dialog.component.less']
})
export class SettingDialogComponent implements OnInit, AfterViewInit, IDialog {

  private logColumns: Array<LogSettingItem> = null;

  constructor(private settingService: SettingService) { }

  ngOnInit() {
    console.log('Setting OnInit()');
  }

  ngAfterViewInit(): void {
    console.log('Setting OnAfterViewInit()');
  }

  public visible = false;
  private visibleAnimate = false;

  public show(): void {
    console.log('Setting OnShow()');


    const colNames: Array<string> = this.settingService.getAllColumnNames();

    this.logColumns = [];

    colNames.forEach((name)=> {
      const item: LogSettingItem = this.settingService.getColumn(name);
      this.logColumns.push(new LogSettingItem(item.name, item.show, item.title));
      console.log('Log Column: %s -> %s', item.name, item.show);
    });

    setTimeout(() => {
      this.visible = true;
      setTimeout(() => this.visibleAnimate = true);
    }, 10);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public save(): void {
    // Save the change
    console.log('Setting OnSave()');

    for (let item of this.logColumns) {
      console.log('Saved: Log Column: %s -> %s', item.name, item.show);
      this.settingService.setColumnShow(item.name, item.show);
    }
    this.settingService.updateVisibleColumns();
    setTimeout(() => {
      this.hide();
    }, 10);
  }

  public onToggleColumn(item: LogSettingItem): void {
    if (item) {
      item.show = !item.show;
      console.log('Changed "%s" -> %s', item.name, item.show);
    }
  }

  public onChangedToggle(item: LogSettingItem, value: boolean) {
    if (item) {
      item.show = value;
      console.log('Changed "%s" -> %s', item.name, item.show);
    }
  }

}
