import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { ItWorksModule } from 'elements';

@NgModule({
  imports: [ BrowserModule, ItWorksModule ],
  exports: [ ],
  providers: [ ],
  declarations: [  ],
  bootstrap: [  ],
  entryComponents: [  ]
})
export class AppModule {
  ngDoBootstrap() {}
}