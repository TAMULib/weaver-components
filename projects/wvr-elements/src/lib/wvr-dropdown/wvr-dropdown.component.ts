import { ChangeDetectorRef, Component, HostListener, Input, ViewChild } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { WvrAbstractBaseComponent } from '../shared/wvr-abstract-base.component';
// import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'wvr-wvr-dropdown-element',
  templateUrl: './wvr-dropdown.component.html',
  styleUrls: ['./wvr-dropdown.component.scss']
})
export class WvrDropdownComponent extends WvrAbstractBaseComponent {

  @ViewChild(NgbDropdown) private dropdown: NgbDropdown;

  @Input() btnType: 'primary' | 'seconday' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link' | 'plain' = 'plain';

  @Input() toggleOn: 'click' | 'mouseover' = 'click';

  @HostListener('mouseenter', ['$event']) @HostListener('mouseleave', ['$event']) hoverOpen($event): void {
    if (this.toggleOn === 'mouseover') {
      this.dropdown.toggle();
    } else {
      $event.stopPropagation();
    }
  }

  @HostListener('click', ['$event']) clickOpen($event: Event): void {
    if (this.toggleOn === 'mouseover') {
      $event.stopPropagation();
    } else {
      this.dropdown.toggle();
    }
  }

  constructor(private cdRef: ChangeDetectorRef) {
    super();
  }

  detectChanges(): void {
    this.cdRef.detectChanges();
  }

}
