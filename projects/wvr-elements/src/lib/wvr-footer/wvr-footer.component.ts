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
    const parentElement: HTMLElement = this.elementRef.nativeElement.offsetParent;
    const wvrFooter: HTMLElement = parentElement.querySelector('footer.wvr-footer');
    const selfHeight = wvrFooter.offsetHeight;
    const viewPortSize = window.innerHeight; //document.body.offsetHeight;

    if (parentElement.offsetHeight <= viewPortSize) {
      console.log('CONTENT IS SMALLER');
      // position = vieportSize - self Height
      const footerPosition = viewPortSize - selfHeight;
      //wvrFooter.style.position = 'absolute';
      //wvrFooter.style.top = `${footerPosition}px`;

    } else {
      console.log('CONTENT IS LARGER');
    }

    console.log(wvrFooter);
    console.log("parentElement", parentElement);
    console.log('parentElement.offsetHeight', parentElement.offsetHeight);
    console.log("selfHeight", selfHeight);
    console.log('this.elementRef', this.elementRef);
    console.log('window.innerHeight', window.innerHeight);
  }

  @HostListener('window:resize', ['$event']) onResize(event): void {
    this.positionSelf();
  }

  ngOnInit(): void {
    this.positionSelf();
  }
}
