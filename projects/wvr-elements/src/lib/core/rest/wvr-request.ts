type map = (response: any) => any;

export interface WvrRequestManifest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  options?: {
    headers?: { [header: string]: string | Array<string>; };
    observe?: 'body' | 'response' | 'events';
    params?: { [param: string]: string | Array<string>; };
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'text' | 'json';
    withCredentials?: boolean;
  };
  map?: map;
}

export interface WvrRequest extends WvrRequestManifest {
  url: string;
}
