import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Intended to appear at the top of document and provides for branding, links and page title.
 */
@Component({
  selector: 'wvr-header-element',
  templateUrl: './wvr-header.component.html',
  styleUrls: ['./wvr-header.component.scss']
})
export class WvrHeaderComponent {

  /** The text value to be displayed beside the logo. */
  @Input() logoText = 'Weaver Components';

  /** The header title value to be displayed as a page title. */
  @Input() headerTitle = 'Weaver Header Component';

  /** A resolvable URI to an image to be displayed as the logo. */
  @Input() logoSrc = 'assets/weaver-w.svg';

  /** A resolvable URL to a location linkable from the logo. */
  @Input() logoHref = '#logo';

  /** Allows for the override of the --top-nav-background css variable. Default:  --wvr-secondary */
  @HostBinding('style.--top-nav-background') @Input() topNavBackground;

  /** Allows for the override of the --top-nav-height css variable. Default:  --wvr-navbar-height */
  @HostBinding('style.--top-nav-height') @Input() topNavHeight;

  /** Allows for the override of the --top-nav-padding css variable. Default:  --wvr-navbar-padding */
  @HostBinding('style.--top-nav-padding') @Input() topNavPadding;

  /** Allows for the override of the --logo-img-width css variable. Default:  30px */
  @HostBinding('style.--logo-img-width') @Input() logoImgWidth;

  /** Allows for the override of the --logo-img-width css variable. Default:  30px */
  @HostBinding('style.--logo-img-height') @Input() logoImgHeight;

  /** Allows for the override of the --logo-img-margin css variable. Default:  0 0 0 0 */
  @HostBinding('style.--logo-img-margin') @Input() logoImgMargin;

  /** Allows for the override of the --title-row-background css variable. Default:  --wvr-primary */
  @HostBinding('style.--title-row-background') @Input() titleRowBackground;

  /** Allows for the override of the --title-row-height css variable. Default:  --wvr-navbar-height */
  @HostBinding('style.--title-row-height') @Input() titleRowHeight;

  /** Allows for the override of the --bottom-nav-background css variable. Default:  --wvr-grey */
  @HostBinding('style.--bottom-nav-background') @Input() bottomNavBackground;

  /** Allows for the override of the --bottom-nav-height css variable. Default:  --wvr-navbar-height */
  @HostBinding('style.--bottom-nav-height') @Input() bottomNavHeight;

  /** Allows for the override of the --bottom-nav-padding css variable. Default:  --wvr-navbar-padding */
  @HostBinding('style.--bottom-nav-padding') @Input() bottomNavPadding;

  /** A boolean input to display bottom navigation. */
  @Input() displayBottomNav: boolean;

  /**
   * The weaver header component constructor
   * @param domSanitizer: DomSanitizer - this parameter is injected to the weaver component instance.
   */
  constructor(private readonly domSanitizer: DomSanitizer, private readonly elementRef: ElementRef) {
  }

  bottomNavHasChildren(): boolean {
    const bottomNavListElement = (this.elementRef.nativeElement as HTMLElement).querySelector('.bottom-nav wvr-nav-li, .bottom-nav wvr-nav-li-element');
    return !!bottomNavListElement;
  }

}
