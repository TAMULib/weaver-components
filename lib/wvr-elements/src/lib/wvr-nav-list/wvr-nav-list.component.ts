import { Component, ViewEncapsulation, ElementRef, ViewChild, Injector } from '@angular/core';
import { WvrBaseComponent } from '../shared/wvr-base-component';

@Component({
  selector: 'wvr-nav-list-element',
  templateUrl: './wvr-nav-list.component.html',
  styleUrls: ['./wvr-nav-list.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class WvrNavListComponent {

  constructor(injector: Injector) {
    //super(injector);
  }

  // 
  // slotChange($event) {
  //   const target: HTMLSlotElement = $event.target;
  //   target.assignedElements().forEach((e) => {
  //     let el = e.shadowRoot.querySelector('li');
  //     (this.navlist.nativeElement as HTMLElement).appendChild(el);
  //   });
  // }
}
