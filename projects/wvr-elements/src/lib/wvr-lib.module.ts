import { DOCUMENT } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { WvrHeaderComponent } from './wvr-header/wvr-header.component';
import { WvrItWorksComponent } from './wvr-it-works/wvr-it-works.component';
import { WvrNavLiComponent } from './wvr-nav-list/wvr-nav-li/wvr-nav-li.component';
import { WvrNavListComponent } from './wvr-nav-list/wvr-nav-list.component';
import { WvrTextComponent } from './wvr-text/wvr-text.component';

/** This property contains a list of components and the selector tags. */
const elements = [
  { component: WvrItWorksComponent, selector: 'wvr-it-works' },
  { component: WvrHeaderComponent, selector: 'wvr-header' },
  { component: WvrNavListComponent, selector: 'wvr-nav-list' },
  { component: WvrNavLiComponent, selector: 'wvr-nav-li' },
  { component: WvrTextComponent, selector: 'wvr-text' }
];

/** This property contains a list of components class. */
const components = [
  WvrItWorksComponent,
  WvrHeaderComponent,
  WvrNavListComponent,
  WvrNavLiComponent,
  WvrTextComponent
];

/** This decorator helps organize the weaver component project and provides various features as defined in the properties below. */
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
/** This is an NgModule genereated with the NgModule decorator. */
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
