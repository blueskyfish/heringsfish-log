/*
 * Heringsfish Log Client - https://github.com/blueskyfish/heringsfish-log-client.git
 *
 * The small browser client for the Payara (or Glassfish) application server.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 BlueSkyFish
 */

import { Injectable } from '@angular/core';


function windowRef(): any {
  return window;
}

@Injectable()
export class BrowserService {

  constructor() { }

  window(): any {
    return windowRef();
  }

}
