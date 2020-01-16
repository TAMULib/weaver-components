import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'wvr-header-element',
  templateUrl: './wvr-header.component.html',
  styleUrls: ['./wvr-header.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class WvrHeaderComponent {
  title = 'header-component';
}
