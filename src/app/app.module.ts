import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { AppConfig, APP_CONFIG, registerCustomElements, showHiddentContent, WvrCoreModule, WvrSharedModule, wvrTimeout, WVR_ELEMENTS } from '../../projects/wvr-elements/src/public-api';

const getTinyMCEScript = (appConfig: AppConfig): string => `${appConfig.assetsUrl}/tinymce/tinymce.min.js`;

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // retains last 25 states
      logOnly: true // restrict extension to log-only mode
    }),
    WvrSharedModule,
    WvrCoreModule
  ],
  exports: [],
  providers: [
    {
      provide: TINYMCE_SCRIPT_SRC,
      useFactory: getTinyMCEScript,
      deps: [ APP_CONFIG ]
    }
  ],
  declarations: [],
  bootstrap: [],
  entryComponents: [],
  schemas: []
})
export class AppModule {

  constructor(private readonly injector: Injector) {

  }

  ngDoBootstrap(): void {
    registerCustomElements(this.injector, WVR_ELEMENTS);
    showHiddentContent(this.injector);

    wvrTimeout(() => {
      const elements = document.querySelectorAll('.wvr-components-loading:not(body)');
      elements.forEach(element => {
        element.classList.remove('wvr-components-loading');
      });

      const bodyElem = document.querySelector('body');
      if (bodyElem) {
        bodyElem.classList.remove('wvr-components-loading');
        bodyElem.classList.remove('wvr-hidden');
      }
    });
  }

}
