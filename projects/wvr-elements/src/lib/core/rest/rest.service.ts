import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Request } from './request';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private readonly http: HttpClient) {

  }

  options(request: Request): Observable<any> {
    return this.processRequest(request, (url: string, options: any): any => this.http.options(url, options));
  }

  get(request: Request): Observable<any> {
    return this.processRequest(request, (url: string, options: any): any => this.http.get(url, options));
  }

  post(request: Request): Observable<any> {
    return this.processRequestWithData(request, (url: string, body: any, options: any): any => this.http.post(url, body, options));
  }

  put(request: Request): Observable<any> {
    return this.processRequestWithData(request, (url: string, body: any, options: any): any => this.http.put(url, body, options));
  }

  patch(request: Request): Observable<any> {
    return this.processRequestWithData(request, (url: string, body: any, options: any): any => this.http.patch(url, body, options));
  }

  delete(request: Request): Observable<any> {
    return this.processRequest(request, (url: string, options: any): any => this.http.delete(url, options));
  }

  private processRequest(request: Request, callback: (url: string, options: any) => Observable<any>): Observable<any> {
    return this.preprocessOptions(request)
      .pipe(mergeMap(options => callback(request.url, options)));
  }

  // tslint:disable-next-line:max-line-length
  private processRequestWithData(request: Request, callback: (url: string, body: any, options: any) => Observable<any>): Observable<any> {
    return this.preprocessOptions(request)
      .pipe(mergeMap(options => {
        let body = { ...request.body };
        if (options.bodyHttpParams) {
          const params = {};
          params[options.bodyHttpParams] = body;
          body = new HttpParams(params);
        }

        return callback(request.url, request.body, options);
      }));
  }

  // tslint:disable-next-line:prefer-function-over-method
  private preprocessOptions(request: Request): Observable<any> {
    const options = { ...request.options };

    return new Observable(observer => {
      if (options && options.withCredentials) {
        // Access token work will go here
      }
      observer.next(options);
      observer.complete();
    });
  }

}
