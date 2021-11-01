import { AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, HostListener, Injector, Input, OnInit } from '@angular/core';
import { ResizeSensor } from 'css-element-queries';
import { projectContent } from '../shared/utility/projection.utility';
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
export class WvrFooterComponent extends WvrBaseComponent implements OnInit, AfterViewInit {

  /** An internal reference to the body element. */
  private parentElement: HTMLElement;

  @Input() parentElementName = 'body';

  /** An internal reference to the footer element. */
  private footerElement: HTMLElement;

  /** Height of the parent and footer when the footer is not fixed. */
  private totalHeight: number;

  /** Used internally to toggle fixed behavior. */
  isSticky = false;

  @HostBinding('style.--footer-color') get cardBodyColor(): string {
    return this.themeVariant ? `var(--${this.themeVariant}-button-color)` : 'var(--light-button-color)';
  }

  /** Allows for the override of the --footer-height css variable. */
  @HostBinding('style.--footer-height') @Input() height;

  /** Allows for the override of the --footer-padding css variable. */
  @HostBinding('style.--footer-padding') @Input() padding;

  variantTypes = ['default'];

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
    const parentHeight = this.parentElement.clientHeight;

    if (!this.footerElement) {
      this.footerElement = (this.eRef.nativeElement as HTMLElement).querySelector('footer.wvr-footer');
      this.totalHeight = this.isSticky ? parentHeight + this.footerElement.clientHeight : parentHeight;
    }

    this.footerElement.style.width = `${this.parentElement.clientWidth}px`;

    if (this.isSticky) {
      if (window.innerHeight < this.totalHeight) {
        this.isSticky = false;
      }
    } else {
      this.totalHeight = parentHeight;

      if (window.innerHeight > this.totalHeight) {
        this.isSticky = true;
      }
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

  /** Called after the view has been intialized. Handles the rendering of the projected content. */
  ngAfterViewInit(): void {
    projectContent(this.eRef, 'template[footer-content]', 'div[footer-content]');
  }

}
