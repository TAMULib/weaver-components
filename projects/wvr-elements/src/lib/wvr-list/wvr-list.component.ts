import { Component, Input } from '@angular/core';
import { Theme } from '../shared/theme.type';

@Component({
  selector: 'wvr-list-element',
  templateUrl: './wvr-list.component.html',
  styleUrls: ['./wvr-list.component.scss']
})
export class WvrListComponent {

  @Input() listType =  'unordered';

  @Input() context: Theme;

}
