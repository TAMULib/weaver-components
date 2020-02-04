import { Component, Injector, Input } from '@angular/core';
import { WvrBaseComponent } from '../../shared/wvr-base-component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'wvr-nav-li-element',
  templateUrl: './wvr-nav-li.component.html',
  styleUrls: ['./wvr-nav-li.component.scss']
})
export class WvrNavLiComponent extends WvrBaseComponent {

  @Input()
  public href = '#';

  constructor(injector: Injector) {
    super(injector);
  }

}
