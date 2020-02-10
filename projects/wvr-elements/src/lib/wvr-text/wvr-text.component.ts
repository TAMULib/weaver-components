import { Component, Input } from '@angular/core';
import { wvrThemeHostBindings, wvrThemeInputs } from '../shared/wvr-styles';

@Component({
  selector: 'wvr-text-element',
  templateUrl: './wvr-text.component.html',
  styleUrls: ['./wvr-text.component.scss'],
  inputs: [
    ...wvrThemeInputs
  ],
  host: {
    ...wvrThemeHostBindings
  }
})
export class WvrTextComponent {

  @Input() value: string;

}
