import { Component, ViewEncapsulation, Injector } from '@angular/core';
import { WvrBaseComponent } from '../shared/wvr-base-component';
import { SlotChildren } from '../shared/decorators/SlotChildren/SlotChildren';

@Component({
  selector: 'wvr-nav-list-element',
  templateUrl: './wvr-nav-list.component.html',
  styleUrls: ['./wvr-nav-list.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class WvrNavListComponent extends WvrBaseComponent {

  @SlotChildren("nav-li")
  NavListItems: HTMLElement[] = [];

  constructor(injector: Injector) {
    super(injector);
  }

}
