import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ItWorksModule, WvrHeaderModule, WvrNavListModule, WvrNavItemModule } from 'wvr-elements';

@NgModule({
  imports: [
    BrowserModule,
    ItWorksModule,
    NgbModule,
    WvrHeaderModule,
    WvrNavListModule,
    WvrNavItemModule
  ],
  exports: [],
  providers: [],
  declarations: [],
  bootstrap: [],
  entryComponents: []
})
export class AppModule {
  ngDoBootstrap() { }
}