import { InjectionToken } from '@angular/core';

export interface AppConfig {
  baseUrl?: string;
  assetsUrl?: string;
}

export const blankConfig: AppConfig = {};

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
