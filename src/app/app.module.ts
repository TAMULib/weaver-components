import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { createCustomElement } from '@angular/elements';
import { ItWorksModule } from './it-works/it-works.module';

@NgModule({
  imports: [ BrowserModule, ItWorksModule ],
  exports: [  ],
  providers: [],
  declarations: [  ],
  bootstrap: [  ],
  entryComponents: [  ]
})
export class AppModule {
  ngDoBootstrap() {}
}