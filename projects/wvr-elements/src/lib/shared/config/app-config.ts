import { InjectionToken } from '@angular/core';

/** Describes the application configuration values. */
interface AppConfig {

  /** Theme to apply to all Weaver Components. */
  theme: string;

  /** A reference to the location from which Weaver Components is currently being served. */
  baseUrl: string;

  /** A reference to the location from which Weaver Component's Assets are currently being served. */
  assetsUrl?: string;

}

/** An injection token for the AppConfig */
const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

export {
  AppConfig,
  APP_CONFIG
};
