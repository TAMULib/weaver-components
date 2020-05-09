import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { NgbDropdown, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { WvrAbstractBaseComponent } from '../shared/wvr-abstract-base.component';

@Component({
  selector: 'wvr-wvr-dropdown-element',
  templateUrl: './wvr-dropdown.component.html',
  styleUrls: ['./wvr-dropdown.component.scss']
})
export class WvrDropdownComponent extends WvrAbstractBaseComponent {

  @ViewChild(NgbDropdown) private dropdown: NgbDropdown;

  @Input() btnType: 'primary' | 'seconday' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link' | 'plain' = 'plain';

  @Input() toggleOn: 'click' | 'mouseover' = 'click';

  @Input() animationTime = 250;

  open = false;

  constructor(private cdRef: ChangeDetectorRef, private config: NgbDropdownConfig, private eRef: ElementRef) {
    super();
    config.autoClose = false;
  }

  detectChanges(): void {
    this.cdRef.detectChanges();
  }

  isOpen(): boolean {
    return this.dropdown ? this.dropdown.isOpen() : false;
  }

  @HostListener('mouseenter', ['$event']) hoverOpen($event: Event): void {
    if (this.toggleOn === 'mouseover') {
     this.openDropdown();
    }
  }

  @HostListener('mouseleave', ['$event']) hoverClose($event: Event): void{
    if (this.toggleOn === 'mouseover') {
      this.closeDropdown();
    }
  }

  @HostListener('document:click', ['$event']) clickout($event): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

  clickOpen($event: Event): void {
    $event.stopImmediatePropagation();
    if (this.toggleOn === 'click') {
      this.isOpen() ? this.closeDropdown() : this.openDropdown();
    }
  }

  private openDropdown(): void {
    this.open = true;
    this.cdRef.detectChanges();
    this.dropdown.open();
  }

  private closeDropdown(): void {
    this.open = false;
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.dropdown.close();
    }, this.animationTime);
  }

}
