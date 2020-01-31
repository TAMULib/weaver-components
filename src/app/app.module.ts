import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ItWorksModule, WvrHeaderModule, WvrNavListModule } from 'wvr-elements';

@NgModule({
  imports: [
    BrowserModule,
    ItWorksModule,
    WvrHeaderModule,
    WvrNavListModule
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