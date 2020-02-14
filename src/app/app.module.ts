import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WvrLibModule } from '../../projects/wvr-elements/src/public-api';

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
  ngDoBootstrap(): void {
    // OVERRIDE
  }
}
