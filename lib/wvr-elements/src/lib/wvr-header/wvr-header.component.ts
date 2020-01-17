import { Component, ContentChildren, Directive, Input, QueryList, ViewEncapsulation, AfterContentInit, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Directive({ selector: 'wvr-header-top-navigation' })
export class TopLinks {}

@Component({
  selector: 'wvr-header-element',
  templateUrl: './wvr-header.component.html',
  styleUrls: ['./wvr-header.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class WvrHeaderComponent {
  title = 'header-component';
  @Input() logoText = ' | Weaver Components';
  @Input() headerTitle = 'Weaver Header Component';
  @Input() logoSrc:SafeUrl = '';

  @ContentChildren(TopLinks) topLinks: QueryList<TopLinks>

  constructor(private domSanitizer: DomSanitizer) {
    this.logoSrc = domSanitizer.bypassSecurityTrustUrl('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAzODMgMzgzIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjsiPjxnPjxwYXRoIGQ9Ik0zODIuMzY2LDk1LjU5MmMwLC01Mi43NTkgLTQyLjgzMywtOTUuNTkyIC05NS41OTEsLTk1LjU5MmwtMTkxLjE4MywwYy01Mi43NTksMCAtOTUuNTkyLDQyLjgzMyAtOTUuNTkyLDk1LjU5MmwwLDE5MS4xODNjMCw1Mi43NTggNDIuODMzLDk1LjU5MSA5NS41OTIsOTUuNTkxbDE5MS4xODMsMGM1Mi43NTgsMCA5NS41OTEsLTQyLjgzMyA5NS41OTEsLTk1LjU5MWwwLC0xOTEuMTgzWiIgc3R5bGU9ImZpbGw6IzUwMDAwMDsiLz48dGV4dCB4PSIzMS40ODdweCIgeT0iMzAyLjA2M3B4IiBzdHlsZT0iZm9udC1mYW1pbHk6J0hpcmFLYWt1U3RkTi1XOCcsICdIaXJhZ2lubyBLYWt1IEdvdGhpYyBTdGROJywgc2Fucy1zZXJpZjtmb250LXdlaWdodDo4MDA7Zm9udC1zaXplOjI4OHB4O2ZpbGw6I2ZmZjsiPlc8L3RleHQ+PC9nPjwvc3ZnPg==');
  }

  ngAfterContentInit(): void {
    console.log(this.topLinks);
  }

}
