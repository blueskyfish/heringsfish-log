/*
 * Heringsfish Log Client - https://github.com/blueskyfish/heringsfish-log-client.git
 *
 * The small browser client for the Payara (or Glassfish) application server.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 BlueSkyFish
 */

import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-toggle',
  template: `<div class="toggle" [ngClass]="{'checked': checked, 'unchecked': !checked }" id="toggle_{{name}}" (click)="onClickToggle()"></div>`,
  styleUrls: ['./toggle.component.less']
})
export class ToggleComponent implements OnInit {

  @Input()
  private name: string = '';

  @Input()
  private checked: boolean = true;
  @Output()
  private onChanged = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    console.log('Toogle "%s" -> %s', this.name, this.checked);
  }

  onClickToggle() {
    this.checked = !this.checked;
    this.onChanged.emit(this.checked);
    console.log('Toggle "%s" OnClicked(checked=%s)', this.name, this.checked)
  }
}
