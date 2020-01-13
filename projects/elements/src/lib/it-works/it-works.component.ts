import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'it-works',
  templateUrl: './it-works.component.html',
  styleUrls: ['./it-works.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class ItWorksComponent {
  title = 'it-works-component';
}
