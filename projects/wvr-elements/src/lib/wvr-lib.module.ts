import { DOCUMENT } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WvrButtonComponent } from './wvr-button/wvr-button.component';
import { WvrHeaderComponent } from './wvr-header/wvr-header.component';
import { WvrItWorksComponent } from './wvr-it-works/wvr-it-works.component';
import { WvrNavLiComponent } from './wvr-nav-list/wvr-nav-li/wvr-nav-li.component';
import { WvrNavListComponent } from './wvr-nav-list/wvr-nav-list.component';
import { WvrTextComponent } from './wvr-text/wvr-text.component';
import { WvrFooterComponent } from './wvr-footer/wvr-footer.component';
import { WvrDropdownComponent } from './wvr-dropdown/wvr-dropdown.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';
import { WvrIconComponent } from './wvr-icon/wvr-icon.component';
import { IconService } from './wvr-icon/icon.service';
import { ConfigService } from './shared/config.service';
import { WvrBaseComponent } from './shared/wvr-base.component';



/** This property contains a list of components and the selector tags. */
const elements = [
  { component: WvrButtonComponent, selector: 'wvr-button' },
  { component: WvrDropdownComponent, selector: 'wvr-dropdown' },
  { component: WvrFooterComponent, selector: 'wvr-footer' },
  { component: WvrHeaderComponent, selector: 'wvr-header' },
  { component: WvrIconComponent, selector: 'wvr-icon' },
  { component: WvrItWorksComponent, selector: 'wvr-it-works' },
  { component: WvrNavListComponent, selector: 'wvr-nav-list' },
  { component: WvrNavLiComponent, selector: 'wvr-nav-li' },
  { component: WvrTextComponent, selector: 'wvr-text' }
];

/** This property contains a list of components classes. */
const components = [
  WvrBaseComponent,
  WvrButtonComponent,
  WvrDropdownComponent,
  WvrFooterComponent,
  WvrHeaderComponent,
  WvrIconComponent,
  WvrItWorksComponent,
  WvrNavListComponent,
  WvrNavLiComponent,
  WvrTextComponent
];

const initializeConfig = (configService: ConfigService) => {
  const loadConfigPromise = configService.load();

  return loadConfigPromise;
};

/** The main module for the Weaver Elements library. */
@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    NgbModule
  ],
  exports: [
    ...components
  ],
  providers: [
    IconService,
    ConfigService
  ],
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
    initializeConfig(injector.get(ConfigService))
      .then(() => {
        elements.forEach(element => {
          try {
            const strategyFactory = new ElementZoneStrategyFactory(element.component, injector);
            customElements.define(element.selector, createCustomElement(element.component, { injector, strategyFactory }));
          } catch (e) {
            // console.warn(e);
          }
        });
      });
    const doc = injector.get(DOCUMENT);
    doc.querySelectorAll('[wvr-hide-content]')
      .forEach(elem => {
        elem.removeAttribute('wvr-hide-content');
      });
  }
}
