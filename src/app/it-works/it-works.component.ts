import { Component, Injector, ViewEncapsulation } from '@angular/core';

import { createCustomElement } from '@angular/elements';

@Component({
  selector: 'it-works',
  templateUrl: './it-works.component.html',
  styleUrls: ['./it-works.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class ItWorksComponent {
  title = 'it-works-component';
}
