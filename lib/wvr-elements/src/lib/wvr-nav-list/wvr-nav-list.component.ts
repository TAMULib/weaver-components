import { Component, ViewEncapsulation, Injector, Input } from '@angular/core';
import { WvrBaseComponent } from '../shared/wvr-base-component';
import { SlotChildren } from '../shared/decorators/SlotChildren/SlotChildren';

enum alignments {
  LEFT = 0, CENTER = 1, RIGHT = 2, VERTICAL = 3
}

@Component({
  selector: 'wvr-nav-list-element',
  templateUrl: './wvr-nav-list.component.html',
  styleUrls: ['./wvr-nav-list.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class WvrNavListComponent extends WvrBaseComponent {

  @SlotChildren("nav-li")
  NavListItems: HTMLElement[] = [];

  @Input() alignment: "LEFT" | "RIGHT" | "CENTER" = "LEFT";

  alignments = alignments;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    console.log(this.alignment);
  }

}
