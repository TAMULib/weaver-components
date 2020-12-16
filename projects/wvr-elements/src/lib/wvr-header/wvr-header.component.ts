import { AfterContentChecked, ChangeDetectionStrategy, Component, HostBinding, Injector, Input, OnInit } from '@angular/core';
import { ThemeVariantName } from '../shared/theme';
import { WvrBaseComponent } from '../shared/wvr-base.component';

/**
 * Intended to appear at the top of document and provides for branding, links and page title.
 */
@Component({
  selector: 'wvr-header-component',
  templateUrl: './wvr-header.component.html',
  styleUrls: ['./wvr-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WvrHeaderComponent extends WvrBaseComponent implements AfterContentChecked, OnInit {

  /** The text value to be displayed beside the logo. */
  @Input() logoText = 'Weaver Components';

  /** The header title value to be displayed as a page title. */
  @Input() headerTitle = 'Weaver Header Component';

  /** A URL link clickable from the page title to landing page. */
  @Input() headerTitleUrl: string;

  /** A resolvable URI to an image to be displayed as the logo. */
  @Input() logoSrc = `${this.appConfig.assetsUrl}/icons/custom/weaver-w.svg`;

  /** A resolvable URL to a location linkable from the logo. */
  @Input() logoHref = '#logo';

  @HostBinding('style.--header-color') headerColor = `var(--${this.themeVariant}-button-color)`;

  /** Allows for the override of the components theme variant in the top nav */
  @Input() topNavThemeVariant: ThemeVariantName;
  @HostBinding('style.--top-nav-color') get topNavColor(): string {
    return this.topNavThemeVariant ? `var(--${this.topNavThemeVariant}-button-color)` : `var(--${this.themeVariant}-button-color)`;
  }

  /** Allows for the override of the components theme variant in the title row  */
  @Input() titleRowThemeVariant: ThemeVariantName;
  @HostBinding('style.--title-row-color') get titleRowColor(): string {
    return this.titleRowThemeVariant ? `var(--${this.titleRowThemeVariant}-button-color)` : `var(--${this.themeVariant}-button-color)`;
  }

  /** Allows for the override of the components theme variant in the bottom nav  */
  @Input() bottomNavThemeVariant: ThemeVariantName;
  @HostBinding('style.--bottom-nav-color') get bottomNavColor(): string {
    return this.bottomNavThemeVariant ? `var(--${this.bottomNavThemeVariant}-button-color)` : `var(--${this.themeVariant}-button-color)`;
  }

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

  /** Allows for the override of the --title-row-height css variable. Default:  --wvr-navbar-height */
  @HostBinding('style.--title-row-height') @Input() titleRowHeight;

  /** Allows for the override of the --bottom-nav-height css variable. Default:  --wvr-navbar-height */
  @HostBinding('style.--bottom-nav-height') @Input() bottomNavHeight;

  /** Allows for the override of the --bottom-nav-padding css variable. Default:  --wvr-navbar-padding */
  @HostBinding('style.--bottom-nav-padding') @Input() bottomNavPadding;

  /** Used to toggle display of bottom navbar section. */
  @Input() displayBottomNav: 'true' | 'false';

  get logoId(): string {
    return this.logoHref.split('#')[1];
  }

  isBottomNavHidden = false;

  mobileMenuClosed = true;

  /**
   * The weaver header component constructor
   */
  constructor(injector: Injector) {
    super(injector);
    this.themeVariant = 'light';
  }

  ngAfterContentChecked(): void {
    this.checkBottomNavHasChildren();
  }

  toggleMobileMenu(): void {
    this.mobileMenuClosed = !this.mobileMenuClosed;
  }

  /** Determines if the bottom nav list has children in order to display bottom nav section. */
  private checkBottomNavHasChildren(): void {
    const bottomNavListElement = (this.eRef.nativeElement as HTMLElement).querySelector('.bottom-nav wvre-nav-li, .bottom-nav wvr-nav-li-component');
    this.isBottomNavHidden = !(this.displayBottomNav === 'true' || (this.displayBottomNav === undefined && !!bottomNavListElement));
  }

}
