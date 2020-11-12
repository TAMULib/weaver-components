import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../core/theme.service';

@Component({
  selector: 'wvr-theme-component',
  template: '<ng-content></ng-content>'
})
export class WvrThemeComponent {
  constructor(private themeService: ThemeService) {}
}
