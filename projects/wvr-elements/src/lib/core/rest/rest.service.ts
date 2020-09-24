import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WvrRequest } from './wvr-request';
​
@Injectable({
  providedIn: 'root'
})
export class RestService {
​
  constructor(private http: HttpClient) {
​
  }
​
  options(request: WvrRequest): Observable<any> {
    return this.processRequest(request, (url: string, options: any): any => this.http.options(url, options));
  }
​
  get(request: WvrRequest): Observable<any> {
    return this.processRequest(request, (url: string, options: any): any => this.http.get(url, options));
  }
​
  post(request: WvrRequest): Observable<any> {
    return this.processRequestWithData(request, (url: string, body: any, options: any): any => this.http.post(url, body, options));
  }
​
  put(request: WvrRequest): Observable<any> {
    return this.processRequestWithData(request, (url: string, body: any, options: any): any => this.http.put(url, body, options));
  }
​
  patch(request: WvrRequest): Observable<any> {
    return this.processRequestWithData(request, (url: string, body: any, options: any): any => this.http.patch(url, body, options));
  }
​
  delete(request: WvrRequest): Observable<any> {
    return this.processRequest(request, (url: string, options: any): any => this.http.delete(url, options));
  }
​
  private processRequest(request: WvrRequest, callback: (url: string, options: any) => Observable<any>): Observable<any> {
    return this.preprocessOptions(request)
      .pipe(switchMap(options => callback(request.url, options)));
  }
​
  // tslint:disable-next-line:max-line-length
  private processRequestWithData(request: WvrRequest, callback: (url: string, body: any, options: any) => Observable<any>): Observable<any> {
    return this.preprocessOptions(request)
      .pipe(switchMap(options => callback(request.url, request.body, options)));
  }
​
  // tslint:disable-next-line:prefer-function-over-method
  private preprocessOptions(request: WvrRequest): Observable<any> {
    const options = {...request.options};

    return new Observable(observer => {
      if (options && options.withCredentials) {
        // Access token work will go here
      }
      observer.next(options);
      observer.complete();
    });
  }
​
}
