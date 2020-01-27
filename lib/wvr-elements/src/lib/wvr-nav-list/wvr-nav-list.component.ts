import { Component, ViewEncapsulation, Injector, Input, ElementRef } from '@angular/core';
import { WvrBaseComponent } from '../shared/wvr-base-component';
import { SlotChildren } from '../shared/decorators/SlotChildren/SlotChildren';
import { Alignment } from './alignment.enum';

@Component({
  selector: 'wvr-nav-list-element',
  templateUrl: './wvr-nav-list.component.html',
  styleUrls: ['./wvr-nav-list.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class WvrNavListComponent extends WvrBaseComponent {

  private readonly COLOR_CSS_VAR: string = '--color';

  @Input() aligned: Alignment = Alignment.LEFT;

  Alignment = Alignment;

  @Input() vertical = false;

  @Input()
  set color(v: string) {
    this.themeSettings.set(this.COLOR_CSS_VAR, v);
  }

  get color(): string {
    return this.themeSettings.get(this.COLOR_CSS_VAR);
  }

  private themeSettings: Map<string, string> = new Map<string, string>();

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.applyTheme();
  }

  private applyTheme(): void {
    this.themeSettings.forEach((varVal, varName) => {
      this.elem.nativeElement.style.setProperty(varName, varVal);
    });
  }

}
