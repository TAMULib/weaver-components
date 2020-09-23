import { Component, HostBinding, HostListener, Injector, Input, OnInit } from '@angular/core';
import { ResizeSensor } from 'css-element-queries';
import { WvrBaseComponent } from '../shared/wvr-base.component';

/**
 * A fullwidth footer component which attaches to the bottom of the document body.
 */
@Component({
  selector: 'wvr-footer-element',
  templateUrl: './wvr-footer.component.html',
  styleUrls: ['./wvr-footer.component.scss']
})
export class WvrFooterComponent extends WvrBaseComponent implements OnInit {

  /** An internal reference to the body element. */
  private parentElement: HTMLElement;

  @Input() parentElementName = 'body';

  /** An internal reference to the footer element. */
  private footerElement: HTMLElement;

  /** Used internally to toggle fixed behavior. */
  isSticky = false;

  /** Allows for the override of the --footer-background css variable. */
  @HostBinding('style.--footer-background') @Input() background;

  /** Allows for the override of the --footer-height css variable. */
  @HostBinding('style.--footer-height') @Input() height;

  /** Allows for the override of the --footer-padding css variable. */
  @HostBinding('style.--footer-padding') @Input() padding;

  /**
   * The weaver footer component constructor
   */
  constructor(injector: Injector) {
    super(injector);
  }

  /**
   * Resizes the width of the footer to match its parents width,
   * and calculates height to determine 'stickiness'
   */
  @HostListener('window:resize', ['$event']) positionSelf(): void {
    this.footerElement.style.width = `${this.parentElement.clientWidth}px`;
    const compareHeight = this.isSticky ? (window.innerHeight - this.footerElement.clientHeight) : window.innerHeight;
    const newIsSticky = this.parentElement.clientHeight <= compareHeight;
    if (this.isSticky !== newIsSticky) {
      this.isSticky = newIsSticky;
    }
  }

  /**
   * Sets aside a reference to the document body as 'parentElement'
   * and registers a new ResizeSensor for the parentElement, with
   * a call to positionSelf as the callback method.
   */
  ngOnInit(): void {
    // this.parentElement = (this._eRef.nativeElement as HTMLElement).parentElement;
    this.parentElement = document.querySelector(this.parentElementName);
    this.footerElement = (this._eRef.nativeElement as HTMLElement).querySelector('footer.wvr-footer');
    const rs = new ResizeSensor(this.parentElement, () => {
      this.positionSelf();
    });
  }

}
