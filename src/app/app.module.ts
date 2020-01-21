import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ItWorksModule, WvrHeaderModule } from 'wvr-elements';

@NgModule({
  imports: [
    BrowserModule,
    ItWorksModule,
    NgbModule,
    WvrHeaderModule,
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