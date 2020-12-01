import { AfterContentChecked, ChangeDetectionStrategy, Component, HostBinding, Injector, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as rootStore from '../core/store';
import { WvrSelect } from '../shared/utility/decorators.utilty';
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
export class WvrHeaderComponent extends WvrBaseComponent implements OnInit, AfterContentChecked {

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

  private _displayBottomNav: 'true' | 'false';

  /** Used to toggle display of bottom navbar section. */
  @Input() set displayBottomNav(value: 'true' | 'false') {
    this._displayBottomNav = value;
    this.checkBottomNavHasChildren();
  }

  get displayBottomNav(): 'true' | 'false' {
    return this._displayBottomNav;
  }

  get logoId(): string {
    return this.logoHref.split('#')[1];
  }

  isBottomNavHidden = false;

  mobileMenuClosed = true;

  // tslint:disable-next-line: prefer-readonly
  @WvrSelect({ selector: rootStore.selectManifestEntryResponse('sample', 'one') }) private sampleTestResponse: Observable<string>;

  /**
   * The weaver header component constructor
   */
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.checkBottomNavHasChildren();
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
