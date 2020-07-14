import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WvrLibModule } from '../../projects/wvr-elements/src/public-api';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    BrowserModule,
    WvrLibModule,
    NgbModule
  ],
  exports: [],
  providers: [],
  declarations: [],
  bootstrap: [],
  entryComponents: []
})
export class AppModule {
  ngDoBootstrap(app): void {
    // OVERRIDE
  }
}
