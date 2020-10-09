import { DOCUMENT } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IconService } from './core/icon.service';
import { MobileService } from './core/mobile.service';
import { WvrAlertComponent } from './wvr-alert/wvr-alert.component';
import { WvrAnimationService } from './core/wvr-animation.service';
import { WvrButtonComponent } from './wvr-button/wvr-button.component';
import { WvrDropdownComponent } from './wvr-dropdown/wvr-dropdown.component';
import { WvrFooterComponent } from './wvr-footer/wvr-footer.component';
import { WvrHeaderComponent } from './wvr-header/wvr-header.component';
import { WvrIconComponent } from './wvr-icon/wvr-icon.component';
import { WvrItWorksComponent } from './wvr-it-works/wvr-it-works.component';
import { WvrListItemComponent } from './wvr-list/wvr-list-item/wvr-list-item.component';
import { WvrListComponent } from './wvr-list/wvr-list.component';
import { WvrNavLiComponent } from './wvr-nav-list/wvr-nav-li/wvr-nav-li.component';
import { WvrNavListComponent } from './wvr-nav-list/wvr-nav-list.component';
import { WvrTextComponent } from './wvr-text/wvr-text.component';
import { WvrTabsComponent } from './wvr-tabs/wvr-tabs.component';
import { WvrTabComponent } from './wvr-tabs/wvr-tab/wvr-tab.component';

/** This property contains a list of components and the selector tags. */
const elements = [
  { component: WvrAlertComponent, selector: 'wvre-alert'},
  { component: WvrButtonComponent, selector: 'wvre-button' },
  { component: WvrDropdownComponent, selector: 'wvre-dropdown' },
  { component: WvrFooterComponent, selector: 'wvre-footer' },
  { component: WvrHeaderComponent, selector: 'wvre-header' },
  { component: WvrIconComponent, selector: 'wvre-icon' },
  { component: WvrItWorksComponent, selector: 'wvre-it-works' },
  { component: WvrListComponent, selector: 'wvre-list' },
  { component: WvrListItemComponent, selector: 'wvre-list-item' },
  { component: WvrNavListComponent, selector: 'wvre-nav-list' },
  { component: WvrNavLiComponent, selector: 'wvre-nav-li' },
  { component: WvrTextComponent, selector: 'wvre-text' },
  { component: WvrTabsComponent, selector: 'wvre-tabs' },
  { component: WvrTabComponent, selector: 'wvre-tab' }
];

/** This property contains a list of components classes. */
const components = [
  WvrAlertComponent,
  WvrButtonComponent,
  WvrDropdownComponent,
  WvrFooterComponent,
  WvrHeaderComponent,
  WvrIconComponent,
  WvrListComponent,
  WvrListItemComponent,
  WvrItWorksComponent,
  WvrNavListComponent,
  WvrNavLiComponent,
  WvrTextComponent,
  WvrTabsComponent,
  WvrTabComponent
];

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
    MobileService,
    WvrAnimationService
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
