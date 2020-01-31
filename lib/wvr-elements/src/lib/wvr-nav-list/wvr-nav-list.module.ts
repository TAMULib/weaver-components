import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { WvrNavListComponent } from './wvr-nav-list.component';
import { WvrNavLiComponent } from './wvr-nav-li/wvr-nav-li.component';

@NgModule({
  imports: [BrowserModule],
  exports: [WvrNavListComponent, WvrNavLiComponent],
  providers: [],
  declarations: [WvrNavListComponent, WvrNavLiComponent],
  bootstrap: [],
  entryComponents: [WvrNavListComponent, WvrNavLiComponent]
})
export class WvrNavListModule {

  private static readonly LIST_TAG_NAME = 'wvr-nav-list';
  private static readonly LI_TAG_NAME = 'wvr-nav-li';

  constructor(injector: Injector) {

    try {
      const WvrNavListElement = createCustomElement(WvrNavListComponent, { injector });
      customElements.define(WvrNavListModule.LIST_TAG_NAME, WvrNavListElement);
      const WvrNavLiElement = createCustomElement(WvrNavLiComponent, { injector });
      customElements.define(WvrNavListModule.LI_TAG_NAME, WvrNavLiElement);
    } catch (e) {
      console.warn(e);
    }

  }

}