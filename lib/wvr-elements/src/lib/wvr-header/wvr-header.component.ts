import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'wvr-header-element',
  templateUrl: './wvr-header.component.html',
  styleUrls: ['./wvr-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WvrHeaderComponent implements OnInit {

  public title = 'header-component';

  @Input()
  public logoSrc = 'https://via.placeholder.com/68';

  @Input()
  public logoText = ' | Weaver Components';

  @Input()
  public headerTitle = 'Weaver Header Component';

  constructor() {

  }

  ngOnInit() {

  }

}
