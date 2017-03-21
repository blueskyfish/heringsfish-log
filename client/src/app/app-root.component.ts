/*
 * Heringsfish Log Client - https://github.com/blueskyfish/heringsfish-log-client.git
 *
 * The small browser client for the Payara (or Glassfish) application server.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 BlueSkyFish
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
<app-nav-bar></app-nav-bar>
<app-message-table></app-message-table>
`
})
export class AppRoot {

  constructor() {}

}
