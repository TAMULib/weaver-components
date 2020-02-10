import { Component, Input } from '@angular/core';
import { wvrThemeHostBindings, wvrThemeInputs } from '../shared/wvr-styles';

@Component({
  templateUrl: './wvr-it-works.component.html',
  styleUrls: ['./wvr-it-works.component.scss'],
  inputs: [
    ...wvrThemeInputs
  ],
  host: {
    ...wvrThemeHostBindings
  }
})
export class WvrItWorksComponent {

  title = 'it-works-component';

  @Input() text = 'Weaver Components Work';

}
