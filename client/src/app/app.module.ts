/*!
 * Heringsfish Log Client - https://github.com/blueskyfish/heringsfish-log-client.git
 *
 * The small browser client for the Payara (or Glassfish) application server.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 BlueSkyFish
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { AppRoot } from './app-root.component';

import { SocketService } from './service/socket.service';
import { SettingService } from "./service/setting.service";

import { NavBarComponent } from './component/nav-bar.component';
import { MessageTableComponent } from './component/message-table.component';
import { AboutDialogComponent } from './dialog/about-dialog.component';
import { SettingDialogComponent } from './dialog/setting-dialog.component';
import { ToggleComponent } from './component/toggle.component';
import { ColumnStylePipe } from './pipe/column-style.pipe';

@NgModule({
  declarations: [
    AppRoot,
    NavBarComponent,
    MessageTableComponent,
    AboutDialogComponent,
    SettingDialogComponent,
    ToggleComponent,
    ColumnStylePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2BootstrapModule.forRoot()
  ],
  providers: [
    SocketService,
    SettingService,
    { provide: 'Window', useValue: window }
  ],
  bootstrap: [AppRoot]
})
export class AppModule { }
