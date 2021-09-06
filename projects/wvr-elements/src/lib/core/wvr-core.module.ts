import { DOCUMENT } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule, Optional, SkipSelf } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { InlineSVGModule } from 'ng-inline-svg';
import { WvrElementDesc } from '../shared/utility/bootstrap.utility';
import { WvrAlertComponent } from '../wvr-alert/wvr-alert.component';
import { WvrButtonComponent } from '../wvr-button/wvr-button.component';
import { WvrCardComponent } from '../wvr-card/wvr-card.component';
import { WvrColorPreviewComponent } from '../wvr-color-preview/wvr-color-preview.component';
import { WvrDropdownComponent } from '../wvr-dropdown/wvr-dropdown.component';
import { WvrFooterComponent } from '../wvr-footer/wvr-footer.component';
import { WvrHeaderComponent } from '../wvr-header/wvr-header.component';
import { WvrIconComponent } from '../wvr-icon/wvr-icon.component';
import { WvrItWorksComponent } from '../wvr-it-works/wvr-it-works.component';
import { WvrListItemComponent } from '../wvr-list/wvr-list-item/wvr-list-item.component';
import { WvrListComponent } from '../wvr-list/wvr-list.component';
import { WvrManifestEntryComponent } from '../wvr-manifest/wvr-manifest-entry/wvr-manifest-entry.component';
import { WvrManifestComponent } from '../wvr-manifest/wvr-manifest.component';
import { WvrModalComponent } from '../wvr-modal/wvr-modal.component';
import { WvrNavLiComponent } from '../wvr-nav-list/wvr-nav-li/wvr-nav-li.component';
import { WvrNavListComponent } from '../wvr-nav-list/wvr-nav-list.component';
import { WvrTabsComponent } from '../wvr-tabs/wvr-tabs.component';
import { WvrTextComponent } from '../wvr-text/wvr-text.component';
import { WvrThemeComponent } from '../wvr-theme/wvr-theme.component';
import { WvrWysiwygComponent } from '../wvr-wysiwyg/wvr-wysiwyg.component';
import { ActionRegistryService } from './action-registry.service';
import { AnimationService } from './animation.service';
import { ComponentRegistryService } from './component-registry.service';
import { LayoutEffects } from './layout/layout.effects';
import { ManifestEffects } from './manifest/manifest.effects';
import { NgBindingsService } from './ng-bindings.service';
import { RestEffects } from './rest/rest.effects';
import { metaReducers, ROOT_REDUCER } from './store';
import { ThemeEffects } from './theme/theme.effects';
import { ThemeService } from './theme/theme.service';
import { WysiwygEffects } from './wysiwyg/wysiwyg.effects';

/** This property contains a list of components and the selector tags. */
export const WVR_ELEMENTS: Array<WvrElementDesc> = [
  { component: WvrAlertComponent, selector: 'wvre-alert', lazy: true },
  { component: WvrButtonComponent, selector: 'wvre-button', lazy: true },
  { component: WvrCardComponent, selector: 'wvre-card', lazy: true },
  { component: WvrColorPreviewComponent, selector: 'wvre-color-preview', lazy: true },
  { component: WvrDropdownComponent, selector: 'wvre-dropdown', lazy: true },
  { component: WvrFooterComponent, selector: 'wvre-footer', lazy: true },
  { component: WvrHeaderComponent, selector: 'wvre-header', lazy: true },
  { component: WvrIconComponent, selector: 'wvre-icon', lazy: true },
  { component: WvrItWorksComponent, selector: 'wvre-it-works', lazy: true },
  { component: WvrListComponent, selector: 'wvre-list', lazy: true },
  { component: WvrListItemComponent, selector: 'wvre-list-item', lazy: true },
  { component: WvrNavListComponent, selector: 'wvre-nav-list', lazy: true },
  { component: WvrManifestComponent, selector: 'wvre-manifest', lazy: false },
  { component: WvrManifestEntryComponent, selector: 'wvre-manifest-entry', lazy: false },
  { component: WvrModalComponent, selector: 'wvre-modal', lazy: true },
  { component: WvrNavLiComponent, selector: 'wvre-nav-li', lazy: true },
  { component: WvrTextComponent, selector: 'wvre-text', lazy: true },
  { component: WvrTabsComponent, selector: 'wvre-tabs', lazy: true },
  { component: WvrThemeComponent, selector: 'wvre-theme', lazy: false },
  { component: WvrWysiwygComponent, selector: 'wvre-wysiwyg', lazy: true }
];

export const registerCustomElements = (injector: Injector, elements: Array<{ component: any, selector: string }>) => {
  elements.forEach(element => {
    try {
      customElements.define(element.selector, createCustomElement(element.component, { injector }));
    } catch (e) {
      // console.warn(e);
    }
  });
};

export const showHiddentContent = (injector: Injector) => {
  const doc = injector.get(DOCUMENT);
  doc.querySelectorAll('[wvr-hide-content]')
    .forEach(elem => {
      elem.removeAttribute('wvr-hide-content');
    });
};

const MODULES: Array<any> = [
  EffectsModule.forRoot([
    ManifestEffects,
    LayoutEffects,
    RestEffects,
    ThemeEffects,
    WysiwygEffects
  ]),
  HttpClientModule,
  InlineSVGModule.forRoot({
    clientOnly: true,
    bypassHttpClientInterceptorChain: true
  }),
  StoreModule.forRoot(ROOT_REDUCER, { metaReducers }),
  StoreDevtoolsModule.instrument()
];

const PROVIDERS = [
  AnimationService,
  ActionRegistryService,
  ComponentRegistryService,
  NgBindingsService,
  ThemeService
];

@NgModule({
  imports: [
    ...MODULES
  ],
  exports: [],
  declarations: [],
  providers: [
    ...PROVIDERS
  ],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WvrCoreModule {

  constructor(@Optional() @SkipSelf() parentModule: WvrCoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
