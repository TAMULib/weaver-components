import { Component, Input, ViewEncapsulation, Injector, AfterViewInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { WvrBaseComponent } from '../shared/wvr-base-component';

@Component({
  selector: 'wvr-header-element',
  templateUrl: './wvr-header.component.html',
  styleUrls: ['./wvr-header.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class WvrHeaderComponent extends WvrBaseComponent {

  private readonly BROW_BG_CSS_VAR: string = '--brow-bg';
  private readonly TITLE_BG_CSS_VAR: string = '--title-bg';
  private readonly LOWER_BG_CSS_VAR: string = '--lower-bg';

  @Input() logoText = 'Weaver Components';
  @Input() headerTitle = 'Weaver Header Component';
  @Input() logoSrc: SafeUrl = this.domSanitizer.bypassSecurityTrustUrl('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAzODMgMzgzIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjsiPjxnPjxwYXRoIGQ9Ik0zODIuMzY2LDk1LjU5MmMwLC01Mi43NTkgLTQyLjgzMywtOTUuNTkyIC05NS41OTEsLTk1LjU5MmwtMTkxLjE4MywwYy01Mi43NTksMCAtOTUuNTkyLDQyLjgzMyAtOTUuNTkyLDk1LjU5MmwwLDE5MS4xODNjMCw1Mi43NTggNDIuODMzLDk1LjU5MSA5NS41OTIsOTUuNTkxbDE5MS4xODMsMGM1Mi43NTgsMCA5NS41OTEsLTQyLjgzMyA5NS41OTEsLTk1LjU5MWwwLC0xOTEuMTgzWiIgc3R5bGU9ImZpbGw6IzUwMDAwMDsiLz48dGV4dCB4PSIzMS40ODdweCIgeT0iMzAyLjA2M3B4IiBzdHlsZT0iZm9udC1mYW1pbHk6J0hpcmFLYWt1U3RkTi1XOCcsICdIaXJhZ2lubyBLYWt1IEdvdGhpYyBTdGROJywgc2Fucy1zZXJpZjtmb250LXdlaWdodDo4MDA7Zm9udC1zaXplOjI4OHB4O2ZpbGw6I2ZmZjsiPlc8L3RleHQ+PC9nPjwvc3ZnPg==');

  @Input()
  set browBg(v: string) {
    this.themeSettings.set(this.BROW_BG_CSS_VAR, v);
  }

  get browBg(): string {
    return this.themeSettings.get(this.BROW_BG_CSS_VAR);
  }

  @Input()
  set titleBg(v: string) {
    this.themeSettings.set(this.TITLE_BG_CSS_VAR, v);
  }

  get titleBg(): string {
    return this.themeSettings.get(this.TITLE_BG_CSS_VAR);
  }

  @Input()
  set lowerBg(v: string) {
    this.themeSettings.set(this.LOWER_BG_CSS_VAR, v);
  }

  get lowerBg(): string {
    return this.themeSettings.get(this.LOWER_BG_CSS_VAR);
  }

  private themeSettings: Map<string, string> = new Map<string, string>();

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.themeSettings.forEach((varVal, varName) => {
      this.elem.nativeElement.style.setProperty(varName, varVal);
    });
  }

}
