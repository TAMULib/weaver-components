import { Component, ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wvr-footer-element',
  templateUrl: './wvr-footer.component.html',
  styleUrls: ['./wvr-footer.component.scss']
})
export class WvrFooterComponent implements OnInit {

  /** Allows for the override of the --wvr-gray css variable. */
  @HostBinding('style.--wvr-gray') @Input() gray;

  constructor(private readonly elementRef: ElementRef) {

  }

  positionSelf(): void {
    console.log(this.elementRef);
  }

  @HostListener('window:resize', ['$event']) onResize(event): void {
    this.positionSelf();
  }

  ngOnInit(): void {
    this.positionSelf();
  }
}
