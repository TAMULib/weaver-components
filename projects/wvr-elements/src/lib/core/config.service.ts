import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from './app-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _appConfig: AppConfig;
  get appConfig(): AppConfig {
    return this._appConfig;
  }

  constructor(private http: HttpClient) {

  }

  load(): Promise<AppConfig> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const configUrl = this.obtainConfigPath();

    const configPromise = this.http.get<AppConfig>(configUrl, { headers })
    .toPromise();

    configPromise.then(appConfig => {
      this._appConfig = appConfig;
    });

    return configPromise;
  }

  // tslint:disable-next-line:prefer-function-over-method
  private obtainConfigPath(): string {
    const componentScript = document.getElementsByTagName('script');
    const componentScriptSrc = componentScript[componentScript.length - 1].src;
    const componentScriptSrcPathParts = componentScriptSrc.split('/');
    componentScriptSrcPathParts.pop();
    const configBasePath = componentScriptSrcPathParts.join('/');

    return `${configBasePath}/config.json`;
  }

}
