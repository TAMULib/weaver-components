import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { createCustomElement } from '@angular/elements';
import { ItWorksComponent } from './it-works.component';

@NgModule({
  imports: [BrowserModule],
  exports: [ItWorksComponent],
  providers: [],
  declarations: [ItWorksComponent],
  bootstrap: [],
  entryComponents: [ItWorksComponent]
})
export class ItWorksModule {

  private static readonly TAG_NAME = 'wvr-it-works';

  constructor(injector: Injector) {
    try {
      const ItWorksElement = createCustomElement(ItWorksComponent, { injector });
      customElements.define(ItWorksModule.TAG_NAME, ItWorksElement);
    } catch (e) {
      console.warn(e);
    }
  }

}
