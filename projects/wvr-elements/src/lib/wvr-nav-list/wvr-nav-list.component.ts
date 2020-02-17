import { Component, Input } from '@angular/core';
import { Alignment } from '../shared/alignment.enum';

@Component({
  selector: 'wvr-nav-list-element',
  templateUrl: './wvr-nav-list.component.html',
  styleUrls: ['./wvr-nav-list.component.scss']
})
export class WvrNavListComponent {

  @Input() aligned = Alignment.LEFT;

  @Input() vertical: 'true' | 'false' = 'false';

}
