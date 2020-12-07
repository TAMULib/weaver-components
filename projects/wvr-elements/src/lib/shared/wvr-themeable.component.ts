import { ElementRef } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';
import { ThemeVariantName } from './theme';

export type variantType = 'alert' | 'badge' | 'border' | 'button' | 'list-group-item' | 'table';

export interface WvrThemeableComponent {
  themeVariant: ThemeVariantName;
  style: SafeStyle;
  themeOverrides: { [key: string]: string };
  readonly variantTypes: Array<variantType>;
  readonly eRef: ElementRef<HTMLElement>;

  applyThemeOverride(customProperty: string, value: string): void;

}
