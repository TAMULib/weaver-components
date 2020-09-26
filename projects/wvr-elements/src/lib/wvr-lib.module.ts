import { DOCUMENT } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { IconService } from './core/icon.service';
import * as ManifestActions from './core/manifest/manifest.actions';
import { ManifestEffects } from './core/manifest/manifest.effects';
import { MobileService } from './core/mobile.service';
import { RestEffects } from './core/rest/rest.effects';
import { metaReducers, RootState, ROOT_REDUCER } from './core/store';
import { WvrAnimationService } from './core/wvr-animation.service';
import { WvrButtonComponent } from './wvr-button/wvr-button.component';
import { WvrDropdownComponent } from './wvr-dropdown/wvr-dropdown.component';
import { WvrFooterComponent } from './wvr-footer/wvr-footer.component';
import { WvrHeaderComponent } from './wvr-header/wvr-header.component';
import { WvrIconComponent } from './wvr-icon/wvr-icon.component';
import { WvrItWorksComponent } from './wvr-it-works/wvr-it-works.component';
import { WvrListItemComponent } from './wvr-list/wvr-list-item/wvr-list-item.component';
import { WvrListComponent } from './wvr-list/wvr-list.component';
import { WvrManifestComponent } from './wvr-manifest/wvr-manifest.component';
import { WvrManifestEntryComponent } from './wvr-manifest/wvr-manifest-entry/wvr-manifest-entry.component';
import { WvrNavLiComponent } from './wvr-nav-list/wvr-nav-li/wvr-nav-li.component';
import { WvrNavListComponent } from './wvr-nav-list/wvr-nav-list.component';
import { WvrTextComponent } from './wvr-text/wvr-text.component';

/** This property contains a list of components and the selector tags. */
const elements = [
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
  { component: WvrTextComponent, selector: 'wvr-text' },
  { component: WvrManifestComponent, selector: 'wvr-manifest' },
  { component: WvrManifestEntryComponent, selector: 'wvr-manifest-entry' }
];

/** This property contains a list of components classes. */
const components = [
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
  WvrManifestComponent,
  WvrManifestEntryComponent
];

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
    ...components
  ],
  providers: [
    IconService,
    MobileService,
    WvrAnimationService
  ],
  declarations: [
    ...components,
    WvrManifestComponent
  ],
  bootstrap: [],
  entryComponents: [
    ...components
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WvrLibModule {
  constructor(injector: Injector, store: Store<RootState>) {

    store.dispatch(ManifestActions.submitRequest({
      request: {
        manifestName: 'sample',
        entryName: 'one'
      }
    }));

    // store.dispatch(ManifestActions.submitRequest({
    //   request: {
    //     manifestName: 'sample',
    //     entryName: 'two'
    //   }
    // }));

    store.dispatch(ManifestActions.addManifests({
      manifests: [{
        name: 'sample',
        baseUrl: 'http://localhost:4200',
        entries: [
          {
            name: 'one',
            path: '/',
            methods: ['GET'],
            options: {
              responseType: 'text'
            }
          },
          {
            name: 'two',
            path: '/',
            methods: ['GET'],
            options: {
              responseType: 'text'
            }
          }
        ]
      }]
    }));

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
