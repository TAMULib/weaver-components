import { DOCUMENT } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { WvrButtonComponent, WvrDropdownComponent, WvrFooterComponent, WvrHeaderComponent, WvrIconComponent, WvrItWorksComponent, WvrLibModule, WvrListComponent, WvrListItemComponent, WvrNavLiComponent, WvrNavListComponent, WvrTextComponent } from '../../projects/wvr-elements/src/public-api';

/** This property contains a list of components and the selector tags. */
export const elements = [
  { component: WvrButtonComponent, selector: 'wvr-button' },
  { component: WvrDropdownComponent, selector: 'wvr-dropdown' },
  { component: WvrFooterComponent, selector: 'wvr-footer' },
  { component: WvrHeaderComponent, selector: 'wvr-header' },
  { component: WvrIconComponent, selector: 'wvr-icon' },
  { component: WvrItWorksComponent, selector: 'wvr-it-works' },
  { component: WvrListComponent, selector: 'wvr-list' },
  { component: WvrListItemComponent, selector: 'wvr-list-item' },
  { component: WvrNavListComponent, selector: 'wvr-nav-list' },
  { component: WvrNavLiComponent, selector: 'wvr-nav-li' },
  { component: WvrTextComponent, selector: 'wvr-text' }
];

@NgModule({
  imports: [WvrLibModule],
  exports: [],
  providers: [],
  declarations: [],
  bootstrap: [],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {

  constructor(private readonly injector: Injector) {

  }

  ngDoBootstrap(): void {
    elements.forEach(element => {
      try {
        customElements.define(element.selector, createCustomElement(element.component, { injector: this.injector }));
      } catch (e) {
        // console.warn(e);
      }
    });
    const doc = this.injector.get(DOCUMENT);
    doc.querySelectorAll('[wvr-hide-content]')
      .forEach(elem => {
        elem.removeAttribute('wvr-hide-content');
      });
  }

}
