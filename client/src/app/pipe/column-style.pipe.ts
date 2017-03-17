/*
 * Heringsfish Log Client - https://github.com/blueskyfish/heringsfish-log-client.git
 *
 * The small browser client for the Payara (or Glassfish) application server.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 BlueSkyFish
 */

import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'columnStyle'
})
export class ColumnStylePipe implements PipeTransform {

  transform(value: string, prefix?: string): string {
    if (!prefix) {
      prefix = 'column';
    }
    return _.toLower(prefix + '-' + value);
  }

}
