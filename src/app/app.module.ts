import { NgModule } from '@angular/core';
import { WvrLibModule } from '../../projects/wvr-elements/src/public-api';

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
  ngDoBootstrap(): void {
    // OVERRIDE
  }
}
