import { Component, ViewEncapsulation, ElementRef, ViewChild, Injector } from '@angular/core';
import { WvrBaseComponent } from '../shared/wvr-base-component';
import { QuerySlotChildren } from '../shared/decorators/QuerySlotChildren/QuerySlotChildren';

@Component({
  selector: 'wvr-nav-list-element',
  templateUrl: './wvr-nav-list.component.html',
  styleUrls: ['./wvr-nav-list.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class WvrNavListComponent extends WvrBaseComponent {

  @QuerySlotChildren("wvr-nav-li", "li")
  wvrNavListItems: HTMLElement[];

  constructor(injector: Injector) {
    super(injector);
  }

}
