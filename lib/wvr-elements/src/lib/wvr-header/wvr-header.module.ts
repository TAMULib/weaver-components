import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { createCustomElement } from '@angular/elements';
import { WvrHeaderComponent } from './wvr-header.component';

@NgModule({
  imports: [BrowserModule, NgbModule],
  exports: [WvrHeaderComponent],
  providers: [],
  declarations: [WvrHeaderComponent],
  bootstrap: [],
  entryComponents: [WvrHeaderComponent]
})
export class WvrHeaderModule {

  private static readonly TAG_NAME = 'wvr-header';

  constructor(injector: Injector) {
    try {
      const WvrHeaderElement = createCustomElement(WvrHeaderComponent, { injector });
      customElements.define(WvrHeaderModule.TAG_NAME, WvrHeaderElement);
    } catch (e) {
      console.warn(e);
    }
  }

}