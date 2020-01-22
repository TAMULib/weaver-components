import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { createCustomElement } from '@angular/elements';
import { WvrNavListComponent } from './wvr-nav-list.component';

@NgModule({
  imports: [BrowserModule, NgbModule],
  exports: [WvrNavListComponent],
  providers: [],
  declarations: [WvrNavListComponent],
  bootstrap: [],
  entryComponents: [WvrNavListComponent]
})
export class WvrNavListModule {

  private static readonly TAG_NAME = 'wvr-nav-list';

  constructor(injector: Injector) {
    try {
      const WvrNavListElement = createCustomElement(WvrNavListComponent, { injector });
      customElements.define(WvrNavListModule.TAG_NAME, WvrNavListElement);
    } catch (e) {
      console.warn(e);
    }
  }

}
