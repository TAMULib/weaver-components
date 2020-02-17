import { Component, ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wvr-footer-element',
  templateUrl: './wvr-footer.component.html',
  styleUrls: ['./wvr-footer.component.scss']
})
export class WvrFooterComponent implements OnInit {

  /** Allows for the override of the --wvr-gray css variable. */
  @HostBinding('style.--wvr-gray') @Input() gray;

  isSticky = false;

  constructor(private readonly elementRef: ElementRef) {

  }

  positionSelf(): void {
    const bodyElem: HTMLElement = document.querySelector('body');
    const wvrFooter: HTMLElement = bodyElem.querySelector('footer.wvr-footer');
    const selfHeight = wvrFooter.offsetHeight;
    const viewPortSize = window.innerHeight;

    if (wvrFooter.offsetTop <= viewPortSize) {
      console.log('CONTENT IS SMALLER');
      // position = vieportSize - self Height
      // const footerPosition = viewPortSize - selfHeight;
      this.isSticky = true;
    } else {
      console.log('CONTENT IS LARGER');
      this.isSticky = false;
    }

    console.log(wvrFooter);
    console.log("bodyElem", bodyElem);
    console.log('bodyElem.offsetHeight', bodyElem.offsetHeight);
    console.log("selfHeight", selfHeight);
    console.log('this.elementRef', this.elementRef);
    console.log('window.innerHeight', window.innerHeight);
  }

  @HostListener('window:resize', ['$event']) onResize(event): void {
    this.positionSelf();
  }

  ngOnInit(): void {
    const htmlElem: HTMLElement = document.querySelector('html');
    const bodyElem: HTMLElement = document.querySelector('body');

    htmlElem.style.height = '100%';
    bodyElem.style.height = '100%';

    this.positionSelf();
  }
}
