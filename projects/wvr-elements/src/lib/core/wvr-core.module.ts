import { DOCUMENT } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule, Optional, SkipSelf } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InlineSVGModule } from 'ng-inline-svg';
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
import { WvrTabComponent } from '../wvr-tabs/wvr-tab/wvr-tab.component';
import { WvrTabsComponent } from '../wvr-tabs/wvr-tabs.component';
import { WvrTextComponent } from '../wvr-text/wvr-text.component';
import { WvrThemeComponent } from '../wvr-theme/wvr-theme.component';
import { WvrWysiwygComponent } from '../wvr-wysiwyg/wvr-wysiwyg.component';
import { AnimationService } from './animation.service';
import { ManifestEffects } from './manifest/manifest.effects';
import { MobileService } from './mobile.service';
import { RestEffects } from './rest/rest.effects';
import { metaReducers, ROOT_REDUCER } from './store';
import { TemplateService } from './template.service';
import { ThemeEffects } from './theme/theme.effects';
import { ThemeService } from './theme/theme.service';
import { WysiwygEffects } from './wysiwyg/wysiwyg.effects';

/** This property contains a list of components and the selector tags. */
export const WVR_ELEMENTS = [
  { component: WvrAlertComponent, selector: 'wvre-alert' },
  { component: WvrButtonComponent, selector: 'wvre-button' },
  { component: WvrCardComponent, selector: 'wvre-card' },
  { component: WvrColorPreviewComponent, selector: 'wvre-color-preview' },
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
  { component: WvrModalComponent, selector: 'wvre-modal' },
  { component: WvrNavLiComponent, selector: 'wvre-nav-li' },
  { component: WvrTextComponent, selector: 'wvre-text' },
  { component: WvrTabsComponent, selector: 'wvre-tabs' },
  { component: WvrTabComponent, selector: 'wvre-tab' },
  { component: WvrThemeComponent, selector: 'wvre-theme' },
  { component: WvrWysiwygComponent, selector: 'wvre-wysiwyg' }
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

const MODULES = [
  EffectsModule.forRoot([
    ManifestEffects,
    RestEffects,
    ThemeEffects,
    WysiwygEffects
  ]),
  HttpClientModule,
  InlineSVGModule.forRoot({
    clientOnly: true,
    bypassHttpClientInterceptorChain: true
  }),
  StoreModule.forRoot(ROOT_REDUCER, { metaReducers })
];

const PROVIDERS = [
  AnimationService,
  MobileService,
  ThemeService,
  TemplateService
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
