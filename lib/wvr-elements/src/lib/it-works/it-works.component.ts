import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'it-works-element',
  templateUrl: './it-works.component.html',
  styleUrls: ['./it-works.component.scss']
})
export class ItWorksComponent {
  title = 'it-works-component';

  @Input() text = 'Weaver Components Work';

}
