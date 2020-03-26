import { DOCUMENT } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from '@angular/cdk/layout';

import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { WvrHeaderComponent } from './wvr-header/wvr-header.component';
import { WvrItWorksComponent } from './wvr-it-works/wvr-it-works.component';
import { WvrNavLiComponent } from './wvr-nav-list/wvr-nav-li/wvr-nav-li.component';
import { WvrNavListComponent } from './wvr-nav-list/wvr-nav-list.component';
import { WvrTextComponent } from './wvr-text/wvr-text.component';
import { WvrFooterComponent } from './wvr-footer/wvr-footer.component';
import { ViewModeService } from './view-mode.service';

/** This property contains a list of components and the selector tags. */
const elements = [
  { component: WvrFooterComponent, selector: 'wvr-footer' },
  { component: WvrHeaderComponent, selector: 'wvr-header' },
  { component: WvrItWorksComponent, selector: 'wvr-it-works' },
  { component: WvrNavListComponent, selector: 'wvr-nav-list' },
  { component: WvrNavLiComponent, selector: 'wvr-nav-li' },
  { component: WvrTextComponent, selector: 'wvr-text' }
];

/** This property contains a list of components classes. */
const components = [
  WvrFooterComponent,
  WvrHeaderComponent,
  WvrItWorksComponent,
  WvrNavListComponent,
  WvrNavLiComponent,
  WvrTextComponent
];

/** The main module for the Weaver Elements library. */
@NgModule({
  imports: [
    BrowserModule,
    NgbModule,
    LayoutModule
  ],
  exports: [
    ...components
  ],
  providers: [ ViewModeService ],
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
    elements.forEach(element => {
      try {
        customElements.define(element.selector, createCustomElement(element.component, { injector }));
      } catch (e) {
        // console.warn(e);
      }
    });
    const doc = injector.get(DOCUMENT);
    doc.querySelectorAll('[wvr-hide-content]')
      .forEach(elem => {
        elem.removeAttribute('wvr-hide-content');
      });
  }
}
