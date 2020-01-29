import { Component, ViewEncapsulation, Injector, Input, ElementRef, AfterViewInit } from '@angular/core';
import { WvrBaseComponent } from '../shared/wvr-base-component';
import { SlotChildren } from '../shared/decorators/SlotChildren/SlotChildren';
import { Alignment } from './alignment.enum';
import { Observable } from 'rxjs';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'wvr-nav-list-element',
  templateUrl: './wvr-nav-list.component.html',
  styleUrls: ['./wvr-nav-list.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class WvrNavListComponent extends WvrBaseComponent {

  @Input() aligned: Alignment = Alignment.LEFT;

  Alignment = Alignment;

  @Input() vertical = false;

  constructor(injector: Injector) {
    super(injector);
  }

  liAdded($event) {
    const assignedElems: HTMLElement[] = $event.target.assignedElements();
    assignedElems.forEach(elem => {
      console.log(elem.shadowRoot);
    });
  }

}
