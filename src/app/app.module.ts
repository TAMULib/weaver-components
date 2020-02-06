import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WvrLibModule } from 'wvr-elements';

@NgModule({
  imports: [
    BrowserModule,
    WvrLibModule
  ],
  exports: [],
  providers: [],
  declarations: [],
  bootstrap: [],
  entryComponents: []
})
export class AppModule {
  ngDoBootstrap(): void { }
}
