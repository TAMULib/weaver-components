import { ChangeDetectorRef, Component } from '@angular/core';
// import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'wvr-wvr-dropdown-element',
  templateUrl: './wvr-dropdown.component.html',
  styleUrls: ['./wvr-dropdown.component.scss']
})
export class WvrDropdownComponent {

  detectChanges(): void {
    this.ref.detectChanges();
  }

  constructor(private ref: ChangeDetectorRef) {

  }

}
