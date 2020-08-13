import { InjectionToken } from '@angular/core';

interface AppConfig {
  baseUrl: string;
  assetsUrl?: string;
}

const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

export {
  AppConfig,
  APP_CONFIG
};
