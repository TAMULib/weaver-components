import { Component, Input } from '@angular/core';
import { Alignment } from '../shared/alignment.enum';
import { wvrThemeHostBindings, wvrThemeInputs } from '../shared/wvr-styles';

@Component({
  selector: 'wvr-nav-list-element',
  templateUrl: './wvr-nav-list.component.html',
  styleUrls: ['./wvr-nav-list.component.scss'],
  inputs: [
    ...wvrThemeInputs
  ],
  host: {
    ...wvrThemeHostBindings
  }
})
export class WvrNavListComponent {

  @Input() aligned = Alignment.LEFT;

  @Input() vertical = false;

}
