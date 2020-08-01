import { Component, Injector, Input } from '@angular/core';
import { Theme } from '../shared/theme.type';
import { WvrBaseComponent } from '../shared/wvr-base.component';

@Component({
  selector: 'wvr-list-element',
  templateUrl: './wvr-list.component.html',
  styleUrls: ['./wvr-list.component.scss']
})
export class WvrListComponent extends WvrBaseComponent {

  @Input() listType = 'unordered';

  @Input() context: Theme;

  constructor(injector: Injector) {
    super(injector);
  }

}
