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

  /** Used to define the class type for header component.  */
  @Input() themeVariant: ThemeVariantName = 'info';

  /** Used to define the background property for title row in header component. */
  private _titleRowThemeVariant: ThemeVariantName = this.themeVariant;

  /** This sets the title row theme variant property. */
  @Input() set titleRowThemeVariant(themeVariantName: ThemeVariantName) {
    this._titleRowThemeVariant = themeVariantName;
  }

  /** This returns the title row theme variant. */
  get titleRowThemeVariant(): ThemeVariantName {
    return this._titleRowThemeVariant ? this._titleRowThemeVariant : this.themeVariant;
  }

  /** Used to define the background property for top navigation section in header component. */
  private _topNavThemeVariant: ThemeVariantName = this.themeVariant;

  /** This sets the top navigation theme variant. */
  @Input() set topNavThemeVariant(themeVariantName: ThemeVariantName) {
    this._topNavThemeVariant = themeVariantName;
  }

  /** This returns the top navigation theme variant. */
  get topNavThemeVariant(): ThemeVariantName {
    return this._topNavThemeVariant ? this._topNavThemeVariant : this.themeVariant;
  }

  /** Used to define the background property for bottom navigation section in header component. */
  private _bottomNavThemeVariant: ThemeVariantName = this.themeVariant;

  /** This sets the top navigation theme variant property. */
  @Input() set bottomNavThemeVariant(themeVariantName: ThemeVariantName) {
    this._bottomNavThemeVariant = themeVariantName;
  }

  /** This returns the bottom navigation theme variant property. */
  get bottomNavThemeVariant(): ThemeVariantName {
    return this._bottomNavThemeVariant ? this._bottomNavThemeVariant : this.themeVariant;
  }

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
  }

  ngAfterContentChecked(): void {
    this.checkBottomNavHasChildren();
  }

  toggleMobileMenu(): void {
    this.mobileMenuClosed = !this.mobileMenuClosed;
  }

  /** Determines if the bottom nav list has children in order to display bottom nav section. */
  private checkBottomNavHasChildren(): void {
    const bottomNavListElement = (this._eRef.nativeElement as HTMLElement).querySelector('.bottom-nav wvre-nav-li, .bottom-nav wvr-nav-li-component');
    this.isBottomNavHidden = !(this.displayBottomNav === 'true' || (this.displayBottomNav === undefined && !!bottomNavListElement));
  }

}
