import { HttpParams } from "@angular/common/http";

export interface RequestOptions {
  headers?: { [header: string]: string | Array<string>; };
  observe?: 'body' | 'response' | 'events';
  params?: HttpParams | { [param: string]: string | Array<string>; };
  reportProgress?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'text' | 'json';
  withCredentials?: boolean;
}
