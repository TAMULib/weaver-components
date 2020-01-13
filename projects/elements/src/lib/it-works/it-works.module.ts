import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { createCustomElement } from '@angular/elements';
import { ItWorksComponent } from './it-works.component';

@NgModule({
  imports: [ BrowserModule ],
  exports: [ ItWorksComponent ],
  providers: [],
  declarations: [ ItWorksComponent ],
  bootstrap: [  ],
  entryComponents: [ ItWorksComponent ]
})
export class ItWorksModule {
  constructor(injector: Injector) {
    const ItWorksElement = createCustomElement(ItWorksComponent, {injector});
    customElements.define('wvr-it-works', ItWorksElement);
  }
}