import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WvrLibModule } from '../../projects/wvr-elements/src/public-api';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    WvrLibModule,
    NgbModule
  ],
  exports: [],
  providers: [],
  declarations: [],
  bootstrap: [],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  ngDoBootstrap(): void {
    // OVERRIDE
  }
}
