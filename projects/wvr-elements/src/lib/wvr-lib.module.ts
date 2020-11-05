import { DOCUMENT } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { IconService } from './core/icon.service';
import { ManifestEffects } from './core/manifest/manifest.effects';
import { MobileService } from './core/mobile.service';
import { RestEffects } from './core/rest/rest.effects';
import { metaReducers, ROOT_REDUCER } from './core/store';
import { TemplateService } from './core/template.service';
import { WvrAnimationService } from './core/wvr-animation.service';
import { DefaultPipe } from './shared/pipes/default.pipe';
import { SafePipe } from './shared/pipes/safe.pipe';
import { WvrAlertComponent } from './wvr-alert/wvr-alert.component';
import { WvrButtonComponent } from './wvr-button/wvr-button.component';
import { WvrCardComponent } from './wvr-card/wvr-card.component';
import { WvrDropdownComponent } from './wvr-dropdown/wvr-dropdown.component';
import { WvrFooterComponent } from './wvr-footer/wvr-footer.component';
import { WvrHeaderComponent } from './wvr-header/wvr-header.component';
import { WvrIconComponent } from './wvr-icon/wvr-icon.component';
import { WvrItWorksComponent } from './wvr-it-works/wvr-it-works.component';
import { WvrListItemComponent } from './wvr-list/wvr-list-item/wvr-list-item.component';
import { WvrListComponent } from './wvr-list/wvr-list.component';
import { WvrManifestEntryComponent } from './wvr-manifest/wvr-manifest-entry/wvr-manifest-entry.component';
import { WvrManifestComponent } from './wvr-manifest/wvr-manifest.component';
import { WvrNavLiComponent } from './wvr-nav-list/wvr-nav-li/wvr-nav-li.component';
import { WvrNavListComponent } from './wvr-nav-list/wvr-nav-list.component';
import { WvrTabComponent } from './wvr-tabs/wvr-tab/wvr-tab.component';
import { WvrTabsComponent } from './wvr-tabs/wvr-tabs.component';
import { WvrTextComponent } from './wvr-text/wvr-text.component';

/** This property contains a list of components and the selector tags. */
const elements = [
  { component: WvrAlertComponent, selector: 'wvre-alert' },
  { component: WvrButtonComponent, selector: 'wvre-button' },
  { component: WvrCardComponent, selector: 'wvre-card' },
  { component: WvrDropdownComponent, selector: 'wvre-dropdown' },
  { component: WvrFooterComponent, selector: 'wvre-footer' },
  { component: WvrHeaderComponent, selector: 'wvre-header' },
  { component: WvrIconComponent, selector: 'wvre-icon' },
  { component: WvrItWorksComponent, selector: 'wvre-it-works' },
  { component: WvrListComponent, selector: 'wvre-list' },
  { component: WvrListItemComponent, selector: 'wvre-list-item' },
  { component: WvrNavListComponent, selector: 'wvre-nav-list' },
  { component: WvrManifestComponent, selector: 'wvre-manifest' },
  { component: WvrManifestEntryComponent, selector: 'wvre-manifest-entry' },
  { component: WvrNavLiComponent, selector: 'wvre-nav-li' },
  { component: WvrTextComponent, selector: 'wvre-text' },
  { component: WvrTabsComponent, selector: 'wvre-tabs' },
  { component: WvrTabComponent, selector: 'wvre-tab' }
];

/** This property contains a list of components classes. */
const components = [
  WvrAlertComponent,
  WvrButtonComponent,
  WvrCardComponent,
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
  WvrManifestComponent,
  WvrManifestEntryComponent,
  WvrTabsComponent,
  WvrTabComponent
];

const pipes = [
  SafePipe,
  DefaultPipe
];

const registerCustomElements = (injector: Injector) => {
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
};

/** The main module for the Weaver Elements library. */
@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    StoreModule.forRoot(ROOT_REDUCER, { metaReducers }),
    EffectsModule.forRoot([
      RestEffects,
      ManifestEffects
    ]),
    StoreDevtoolsModule.instrument()
  ],
  exports: [
    ...components,
    ...pipes
  ],
  providers: [
    IconService,
    MobileService,
    WvrAnimationService,
    TemplateService
  ],
  declarations: [
    ...components,
    ...pipes
  ],
  bootstrap: [],
  entryComponents: [
    ...components
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WvrLibModule {
  constructor(injector: Injector) {
    registerCustomElements(injector);
  }

}
