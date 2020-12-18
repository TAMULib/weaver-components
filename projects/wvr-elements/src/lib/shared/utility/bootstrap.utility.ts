/* istanbul ignore file */

/* TODO: Issue #292. */
import { Type } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppConfig, APP_CONFIG } from '../config';

const componentScript = document.currentScript;

/** Interigates the current script tag for its src and extroplates the configuration path from that location. */
const obtainConfigPath = (): string => {
  const componentScriptSrc = componentScript.getAttribute('src');
  const componentScriptSrcPathParts = componentScriptSrc.split('/');
  componentScriptSrcPathParts.pop();
  const configBasePath = componentScriptSrcPathParts.join('/');

  return `${configBasePath}/config.json`;
};

/** Obtains, parses and injects the configuration. */
const weaverBootstrap = (module: Type<unknown>) => (configPath: string) => fetch(configPath ? configPath : obtainConfigPath())
  .then((response: Response) => response.json())
  .then((appConfig: AppConfig) => platformBrowserDynamic([{
    provide: APP_CONFIG,
    useValue: appConfig
  }])
    .bootstrapModule(module)
    .catch((err: any) => { console.error(err); }));

export {
  obtainConfigPath,
  weaverBootstrap
};
