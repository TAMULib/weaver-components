import { ChangeDetectorRef, Component, ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { ResizeSensor } from 'css-element-queries';

@Component({
  selector: 'wvr-footer-element',
  templateUrl: './wvr-footer.component.html',
  styleUrls: ['./wvr-footer.component.scss']
})
export class WvrFooterComponent implements OnInit {

  /** Allows for the override of the --wvr-gray css variable. */
  @HostBinding('style.--wvr-gray') @Input() gray;

  @Input() isSticky = false;

  private rs: ResizeSensor;

  constructor(private readonly elementRef: ElementRef, private ref: ChangeDetectorRef) {
  }

  @HostListener('window:resize', ['$event']) positionSelf(): void {
    const parentElem: HTMLElement = (this.elementRef.nativeElement as HTMLElement).parentElement;
    const footerElem: HTMLElement = (this.elementRef.nativeElement as HTMLElement).querySelector('footer.wvr-footer');
    footerElem.style.width = `${parentElem.clientWidth}px`;
    const newIsSticky = parentElem.clientHeight <= (window.innerHeight - footerElem.clientHeight);
    if (this.isSticky !== newIsSticky) {
      this.isSticky = newIsSticky;
      this.ref.detectChanges();
    }
  }

  ngOnInit(): void {
    const parentElem: HTMLElement = (this.elementRef.nativeElement as HTMLElement).parentElement;
    this.rs = new ResizeSensor(parentElem, () => {
      this.positionSelf();
    });
  }

}
