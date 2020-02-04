import { Component, Injector, Input } from '@angular/core';
import { WvrBaseComponent } from '../shared/wvr-base-component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'wvr-it-works-element',
  templateUrl: './wvr-it-works.component.html',
  styleUrls: ['./wvr-it-works.component.scss']
})
export class WvrItWorksComponent extends WvrBaseComponent {

  public title = 'it-works-component';

  @Input()
  public text = 'Weaver Components Work';

  constructor(injector: Injector) {
    super(injector);
  }

}
