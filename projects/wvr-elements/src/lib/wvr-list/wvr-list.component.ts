import { ChangeDetectorRef, Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'wvr-list-element',
  templateUrl: './wvr-list.component.html',
  styleUrls: ['./wvr-list.component.scss']
})
export class WvrListComponent {

  @Input() listType =  'ul';

}
