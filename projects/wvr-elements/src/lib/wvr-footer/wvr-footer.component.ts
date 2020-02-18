import { ChangeDetectorRef, Component, ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { ResizeSensor } from 'css-element-queries';

@Component({
  selector: 'wvr-footer-element',
  templateUrl: './wvr-footer.component.html',
  styleUrls: ['./wvr-footer.component.scss']
})
export class WvrFooterComponent implements OnInit {

  private parentElement: HTMLElement;
  private footerElement: HTMLElement;
  isSticky = false;

  /** Allows for the override of the background color. */
  @HostBinding('style.--wvr-gray') @Input() background;

  constructor(private readonly elementRef: ElementRef, private ref: ChangeDetectorRef) { }

  @HostListener('window:resize', ['$event']) positionSelf(): void {
    this.footerElement.style.width = `${this.parentElement.clientWidth}px`;
    const newIsSticky = this.parentElement.clientHeight <= (window.innerHeight - this.footerElement.clientHeight);
    if (this.isSticky !== newIsSticky) {
      this.isSticky = newIsSticky;
      this.ref.detectChanges();
    }
  }

  ngOnInit(): void {
    // this.parentElement = (this.elementRef.nativeElement as HTMLElement).parentElement;
    this.parentElement = document.querySelector('body');
    this.footerElement = (this.elementRef.nativeElement as HTMLElement).querySelector('footer.wvr-footer');
    const rs = new ResizeSensor(this.parentElement, () => {
      this.positionSelf();
    });
  }

}
