import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  assetUrl: string;

  constructor(private http: HttpClient) {

  }

  load(): Promise<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const componentScript = document.getElementsByTagName('script');
    const componentScriptSrc = componentScript[componentScript.length - 1].src;
    const componentScriptSrcPathParts = componentScriptSrc.split('/');
    componentScriptSrcPathParts.pop();
    const configBasePath = componentScriptSrcPathParts.join('/');
    const configUrl = `${configBasePath}/config.json`;

    const promise = this.http.get(configUrl, { headers })
      .toPromise()
      .then(configs => {
        this.assetUrl = (configs as any).assetUrl;
      })
      .catch(err => {
        this.assetUrl = 'http://localhost:4200';
      });

    return promise;
  }

}
