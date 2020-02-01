import { Component, Injector, Input } from '@angular/core';
import { WvrBaseComponent } from '../shared/wvr-base-component';
import { Alignment } from './alignment.enum';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'wvr-nav-list-element',
  templateUrl: './wvr-nav-list.component.html',
  styleUrls: ['./wvr-nav-list.component.scss']
})
export class WvrNavListComponent extends WvrBaseComponent {

  Alignment = Alignment;

  @Input()
  public aligned: Alignment = Alignment.LEFT;

  @Input()
  public vertical = false;

  constructor(injector: Injector) {
    super(injector);
  }

}
