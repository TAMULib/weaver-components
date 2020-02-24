import { Component, HostBinding, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
  @Input() logoSrc: SafeUrl = this.domSanitizer.bypassSecurityTrustUrl('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAzODMgMzgzIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjsiPjxnPjxwYXRoIGQ9Ik0zODIuMzY2LDk1LjU5MmMwLC01Mi43NTkgLTQyLjgzMywtOTUuNTkyIC05NS41OTEsLTk1LjU5MmwtMTkxLjE4MywwYy01Mi43NTksMCAtOTUuNTkyLDQyLjgzMyAtOTUuNTkyLDk1LjU5MmwwLDE5MS4xODNjMCw1Mi43NTggNDIuODMzLDk1LjU5MSA5NS41OTIsOTUuNTkxbDE5MS4xODMsMGM1Mi43NTgsMCA5NS41OTEsLTQyLjgzMyA5NS41OTEsLTk1LjU5MWwwLC0xOTEuMTgzWiIgc3R5bGU9ImZpbGw6IzUwMDAwMDsiLz48dGV4dCB4PSIzMS40ODdweCIgeT0iMzAyLjA2M3B4IiBzdHlsZT0iZm9udC1mYW1pbHk6J0hpcmFLYWt1U3RkTi1XOCcsICdIaXJhZ2lubyBLYWt1IEdvdGhpYyBTdGROJywgc2Fucy1zZXJpZjtmb250LXdlaWdodDo4MDA7Zm9udC1zaXplOjI4OHB4O2ZpbGw6I2ZmZjsiPlc8L3RleHQ+PC9nPjwvc3ZnPg==');

  /** A resolvable URL to a location linkable from the logo. */
  @Input() logoHref = '#test';

  /** Allows for the override of the --top-nav-background css variable. Default:  --wvr-secondary */
  @HostBinding('style.--top-nav-background') @Input() topNavBackground;

  /** Allows for the override of the --top-nav-background css variable. Default:  --wvr-navbar-height */
  @HostBinding('style.--top-nav-height') @Input() topNavHeight;

  /** Allows for the override of the --top-nav-padding css variable. Default:  --wvr-navbar-padding */
  @HostBinding('style.--top-nav-padding') @Input() topNavPadding;

  /** Allows for the override of the --logo-img-width css variable. Default:  30px */
  @HostBinding('style.--logo-img-width') @Input() logoImgWidth;

  /** Allows for the override of the --logo-img-width css variable. Default:  30px */
  @HostBinding('style.--logo-img-height') @Input() logoImgHeight;

  /** Allows for the override of the --logo-img-margin css variable. Default:  0 0 0 0 */
  @HostBinding('style.--logo-img-margin') @Input() logoImgMargin;

  /** Allows for the override of the --title-row-bg css variable. Default:  --wvr-primary */
  @HostBinding('style.--title-row-bg') @Input() titleRowBg;

  /** Allows for the override of the --title-row-height css variable. Default:  --wvr-navbar-height */
  @HostBinding('style.--title-row-height') @Input() titleRowHeight;

  /** Allows for the override of the --bottom-nav-background css variable. Default:  --wvr-grey */
  @HostBinding('style.--bottom-nav-background') @Input() bottomNavBackground;

  /** Allows for the override of the --bottom-nav-height css variable. Default:  --wvr-navbar-height */
  @HostBinding('style.--bottom-nav-height') @Input() bottomNavHeight;

  /** Allows for the override of the --bottom-nav-padding css variable. Default:  --wvr-navbar-padding */
  @HostBinding('style.--bottom-nav-padding') @Input() bottomNavPadding;

  /**
   * The weaver header component constructor
   * @param domSanitizer: DomSanitizer - this parameter is injected to the weaver component instance.
   */
  constructor(private readonly domSanitizer: DomSanitizer) {
  }

}
