import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { WvrNavListComponent } from './wvr-nav-list/wvr-nav-list.component';
import { WvrNavLiComponent } from './wvr-nav-list/wvr-nav-li/wvr-nav-li.component';
import { WvrHeaderComponent } from './wvr-header/wvr-header.component';
import { ItWorksComponent } from './it-works/it-works.component';

const elements = [
  { component: ItWorksComponent, selector: 'wvr-it-works' },
  { component: WvrHeaderComponent, selector: 'wvr-header' },
  { component: WvrNavListComponent, selector: 'wvr-nav-list' },
  { component: WvrNavLiComponent, selector: 'wvr-nav-li' }
];

const components = [
  ItWorksComponent,
  WvrHeaderComponent,
  WvrNavListComponent,
  WvrNavLiComponent
];

@NgModule({
  imports: [
    BrowserModule
  ],
  exports: [
    ...components
  ],
  providers: [],
  declarations: [
    ...components
  ],
  bootstrap: [],
  entryComponents: [
    ...components
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WvrLibModule {

  constructor(injector: Injector) {
    elements.forEach((element) => {
      try {
        customElements.define(element.selector, createCustomElement(element.component, { injector }));
      } catch (e) {
        console.warn(e);
      }
    });
  }

}