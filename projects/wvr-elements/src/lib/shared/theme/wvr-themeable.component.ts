import { ElementRef } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';

export interface WvrThemeableComponent {
  style: SafeStyle;
  readonly _eRef: ElementRef<HTMLElement>;
}
