/*!
 * Heringsfish Log Client - https://github.com/blueskyfish/heringsfish-log-client.git
 *
 * The small browser client for the Payara (or Glassfish) application server.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 BlueSkyFish
 */

import { Component, OnInit } from '@angular/core';
import { IDialog } from "./dialog.interface";

@Component({
  selector: 'app-about-dialog',
  templateUrl: 'about-dialog.component.html'
})
export class AboutDialogComponent implements OnInit, IDialog {

  constructor() { }

  ngOnInit() {
  }

  public visible = false;
  private visibleAnimate = false;

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

}
