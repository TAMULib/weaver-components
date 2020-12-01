import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { registerCustomElements, showHiddentContent, WvrCoreModule, WvrSharedModule, wvrTimeout, WVR_ELEMENTS } from '../../projects/wvr-elements/src/public-api';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // retains last 25 states
      logOnly: true, // restrict extension to log-only mode
    }),
    WvrSharedModule,
    WvrCoreModule
  ],
  exports: [],
  providers: [],
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
      document.querySelector('body').style.display = 'block';
    });
  }

}
