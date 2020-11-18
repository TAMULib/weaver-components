import { ElementRef } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';

export type variantType = 'alert' | 'badge' | 'border' | 'button' | 'list-group-item' | 'table';

export interface WvrThemeableComponent {
  style: SafeStyle;
  themeOverrides: { [key: string]: string };
  readonly variantTypes: Array<variantType>;
  readonly _eRef: ElementRef<HTMLElement>;

  applyThemeOverride(customProperty: string, value: string): void;

}