import { Component, Input, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'it-works-element',
  templateUrl: './it-works.component.html',
  styleUrls: ['./it-works.component.scss']
})
export class ItWorksComponent implements OnInit {


  public title = 'it-works-component';

  @Input()
  public text = 'Weaver Components Work';

  constructor() {

  }

  ngOnInit(): void {

  }

}
