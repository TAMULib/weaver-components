import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Injector, Input, OnInit } from '@angular/core';
import { ResizeSensor } from 'css-element-queries';
import { wvrTimeout } from '../shared/utility';
import { WvrBaseComponent } from '../shared/wvr-base.component';

/**
 * A fullwidth footer component which attaches to the bottom of the document body.
 */
@Component({
  selector: 'wvr-footer-component',
  templateUrl: './wvr-footer.component.html',
  styleUrls: ['./wvr-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WvrFooterComponent extends WvrBaseComponent implements OnInit {

  /** An internal reference to the body element. */
  private parentElement: HTMLElement;

  @Input() parentElementName = 'body';

  /** An internal reference to the footer element. */
  private footerElement: HTMLElement;

  /** Used internally to toggle fixed behavior. */
  isSticky = false;

  @HostBinding('style.--footer-color') get cardBodyColor(): string {
    return this.themeVariant ? `var(--${this.themeVariant}-button-color)` : 'var(--light-button-color)';
  }

  /** Allows for the override of the --footer-height css variable. */
  @HostBinding('style.--footer-height') @Input() height;

  /** Allows for the override of the --footer-padding css variable. */
  @HostBinding('style.--footer-padding') @Input() padding;

  /**
   * The weaver footer component constructor
   */
  constructor(injector: Injector) {
    super(injector);
    this.themeVariant = 'light';
  }

  /**
   * Resizes the width of the footer to match its parents width,
   * and calculates height to determine 'stickiness'
   */
  @HostListener('window:resize', ['$event']) positionSelf(): void {

    if (!this.footerElement) {
      this.footerElement = (this.eRef.nativeElement as HTMLElement).querySelector('footer.wvr-footer');
    }

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
    super.ngOnInit();
    this.parentElement = (this.eRef.nativeElement as HTMLElement).parentElement;
    if (!this.parentElement) {
      this.parentElement = document.querySelector(this.parentElementName);
    }
    const rs = new ResizeSensor(this.parentElement, () => {
      this.positionSelf();
    });
  }

}
