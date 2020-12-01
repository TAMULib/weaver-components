import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AnimationService } from './animation.service';
import { IconService } from './icon.service';
import { ManifestEffects } from './manifest/manifest.effects';
import { MobileService } from './mobile.service';
import { RestEffects } from './rest/rest.effects';
import { metaReducers, ROOT_REDUCER } from './store';
import { TemplateService } from './template.service';
import { ThemeEffects } from './theme/theme.effects';
import { ThemeService } from './theme/theme.service';

const MODULES = [
  HttpClientModule,
  StoreModule.forRoot(ROOT_REDUCER, { metaReducers }),
  EffectsModule.forRoot([
    ManifestEffects,
    RestEffects,
    ThemeEffects
  ])
];

const PROVIDERS = [
  AnimationService,
  IconService,
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
export class CoreModule {

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...PROVIDERS
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
