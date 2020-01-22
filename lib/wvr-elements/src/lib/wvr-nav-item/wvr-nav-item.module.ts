import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { createCustomElement } from '@angular/elements';
import { WvrNavItemComponent } from './wvr-nav-item.component';

@NgModule({
  imports: [BrowserModule, NgbModule],
  exports: [WvrNavItemComponent],
  providers: [],
  declarations: [WvrNavItemComponent],
  bootstrap: [],
  entryComponents: [WvrNavItemComponent]
})
export class WvrNavItemModule {

  private static readonly TAG_NAME = 'wvr-nav-item';

  constructor(injector: Injector) {
    try {
      const WvrNavItemElement = createCustomElement(WvrNavItemComponent, { injector });
      customElements.define(WvrNavItemModule.TAG_NAME, WvrNavItemElement);
    } catch (e) {
      console.warn(e);
    }
  }

}
