import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  baseUrl: string;

  constructor(private http: HttpClient) {

  }

  load(): Promise<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = 'config.json';

    const promise = this.http.get(url, { headers })
      .toPromise()
      .then(configs => {
        this.baseUrl = (configs as any).baseUrl;
      })
      .catch(err => {
        this.baseUrl = 'http://localhost:4200';
      });

    return promise;
  }

}
