import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { createCustomElement } from '@angular/elements';
import { WvrHeaderComponent } from './wvr-header.component';


@NgModule({
  imports: [ BrowserModule ],
  exports: [ WvrHeaderComponent ],
  providers: [],
  declarations: [ WvrHeaderComponent ],
  bootstrap: [  ],
  entryComponents: [ WvrHeaderComponent ]
})
export class WvrHeaderModule {

  private static readonly TAG_NAME = 'wvr-header';

  constructor(injector: Injector) {
    if(!customElements.get(WvrHeaderModule.TAG_NAME)) {
      const ItWorksElement = createCustomElement(WvrHeaderComponent, {injector});
      customElements.define(WvrHeaderModule.TAG_NAME, ItWorksElement);
    }
  }

}