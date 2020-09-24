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
  options<T>(request: WvrRequest): Observable<T> {
    return this.processRequest<T>(request, (url: string, options: any): any => this.http.options<T>(url, options));
  }
​
  get<T>(request: WvrRequest): Observable<T> {
    return this.processRequest<T>(request, (url: string, options: any): any => this.http.get<T>(url, options));
  }
​
  post<T>(request: WvrRequest): Observable<T> {
    return this.processRequestWithData<T>(request, (url: string, body: any, options: any): any => this.http.post<T>(url, body, options));
  }
​
  put<T>(request: WvrRequest): Observable<T> {
    return this.processRequestWithData<T>(request, (url: string, body: any, options: any): any => this.http.put<T>(url, body, options));
  }
​
  patch<T>(request: WvrRequest): Observable<T> {
    return this.processRequestWithData<T>(request, (url: string, body: any, options: any): any => this.http.patch<T>(url, body, options));
  }
​
  delete<T>(request: WvrRequest): Observable<T> {
    return this.processRequest<T>(request, (url: string, options: any): any => this.http.delete<T>(url, options));
  }
​
  private processRequest<T>(request: WvrRequest, callback: (url: string, options: any) => Observable<T>): Observable<T> {
    return this.preprocessOptions(request)
      .pipe(switchMap(options => callback(request.url, options)));
  }
​
  private processRequestWithData<T>(request: WvrRequest, callback: (url: string, body: any, options: any) => Observable<T>): Observable<T> {
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
