import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppConfig, APP_CONFIG } from 'projects/wvr-elements/src/lib/core/app-config';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const obtainConfigPath = (): string => {
  const componentScript = document.getElementsByTagName('script');
  const componentScriptSrc = componentScript[componentScript.length - 1].src;
  const componentScriptSrcPathParts = componentScriptSrc.split('/');
  componentScriptSrcPathParts.pop();
  const configBasePath = componentScriptSrcPathParts.join('/');

  return `${configBasePath}/config.json`;
}

const loadModule = () => fetch(obtainConfigPath())
  .then((response) => response.json())
  .then((appConfig: AppConfig) => platformBrowserDynamic([{
    provide: APP_CONFIG,
    useValue: appConfig
  }])
    .bootstrapModule(AppModule)
    .catch(console.error));

document.addEventListener('DOMContentLoaded', loadModule);
