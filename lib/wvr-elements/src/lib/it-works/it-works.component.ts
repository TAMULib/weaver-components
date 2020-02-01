import { Component, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'it-works-element',
  templateUrl: './it-works.component.html',
  styleUrls: ['./it-works.component.scss']
})
export class ItWorksComponent {

  title = 'it-works-component';

  @Input() text = 'Weaver Components Work';

}
