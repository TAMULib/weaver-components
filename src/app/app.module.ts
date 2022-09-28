import { Injector, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { storeDevtoolsInstrument } from '../environments/environment';
import { TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { AppConfig, APP_CONFIG, registerWeaverElements, WvrCoreModule, WvrSharedModule, WVR_ELEMENTS } from '../../projects/wvr-elements/src/public-api';

const getTinyMCEScript = (appConfig: AppConfig): string => `${appConfig.assetsUrl}/tinymce/tinymce.min.js`;

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ...storeDevtoolsInstrument,
    WvrCoreModule,
    WvrSharedModule
  ],
  exports: [],
  providers: [
    {
      provide: TINYMCE_SCRIPT_SRC,
      useFactory: getTinyMCEScript,
      deps: [APP_CONFIG]
    }
  ],
  declarations: [],
  bootstrap: [],
  entryComponents: [],
  schemas: []
})
export class AppModule {

  constructor(injector: Injector) {
    registerWeaverElements(injector, WVR_ELEMENTS);
  }

  ngDoBootstrap(): void {
    // do nothing
  }

}
