import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ItWorksModule, WvrHeaderModule } from 'wvr-elements';

@NgModule({
  imports: [ 
    BrowserModule, 
    ItWorksModule,
    WvrHeaderModule
  ],
  exports: [ ],
  providers: [ ],
  declarations: [  ],
  bootstrap: [  ],
  entryComponents: [  ]
})
export class AppModule {
  ngDoBootstrap() {}
}