import { Component, ViewEncapsulation, Injector, Input } from '@angular/core';
import { WvrBaseComponent } from '../../shared/wvr-base-component';

@Component({
  selector: 'wvr-nav-li-element',
  templateUrl: './wvr-nav-li.component.html',
  styleUrls: ['./wvr-nav-li.component.scss']
})
export class WvrNavLiComponent extends WvrBaseComponent {

  @Input() href = "#";

  constructor(injector: Injector) {
    super(injector);
  }

}
