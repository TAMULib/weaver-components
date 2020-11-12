import { ElementRef } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';

export type VarientType = 'alert' | 'badge' | 'border' | 'button' | 'list-group-item' | 'table';

export interface WvrThemeableComponent {
  style: SafeStyle;
  readonly varientTypes: Array<VarientType>;
  readonly _eRef: ElementRef<HTMLElement>;
}
