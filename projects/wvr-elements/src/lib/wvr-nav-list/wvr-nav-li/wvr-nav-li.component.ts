import { Component, Input } from '@angular/core';
import { wvrThemeHostBindings, wvrThemeInputs } from '../../shared/wvr-styles';

@Component({
  selector: 'wvr-nav-li-element',
  templateUrl: './wvr-nav-li.component.html',
  styleUrls: ['./wvr-nav-li.component.scss'],
  inputs: [
    ...wvrThemeInputs
  ],
  host: {
    ...wvrThemeHostBindings
  }
})
export class WvrNavLiComponent {

  @Input() href: string;

}
