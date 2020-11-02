export interface RequestOptions {
  headers?: { [header: string]: string | Array<string>; };
  observe?: 'body' | 'response' | 'events';
  params?: { [param: string]: string | Array<string>; };
  reportProgress?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'text' | 'json';
  withCredentials?: boolean;
}
