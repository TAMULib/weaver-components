import { Component, ViewEncapsulation, Injector, Input } from '@angular/core';
import { WvrBaseComponent } from '../shared/wvr-base-component';
import { Alignment } from './alignment.enum';

@Component({
  selector: 'wvr-nav-list-element',
  templateUrl: './wvr-nav-list.component.html',
  styleUrls: ['./wvr-nav-list.component.scss']
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
