import { Injector, NgModule } from '@angular/core';
import { registerCustomElements, showHiddentContent, WvrLibModule, wvrTimeout, WVR_ELEMENTS } from '../../projects/wvr-elements/src/public-api';

@NgModule({
  imports: [
    WvrLibModule
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
