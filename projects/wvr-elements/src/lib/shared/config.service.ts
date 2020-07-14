import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ConfigService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    console.log('constructing config service');
}

  load(): Promise<void> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const url = 'config.json';

      const promise = this.http.get(url, { headers })
          .toPromise()
          .then(configs => { 
              console.log('environment loaded');
              this.baseUrl = (configs as any).baseUrl;
          })
          .catch(err => { 
              console.log(err);
          });

      return promise;
  }

}
