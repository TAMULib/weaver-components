import { RequestMethod } from './request-method';
import { RequestOptions } from './request-options';

type map = (response: any) => any;

export interface Request {
  url: string;
  method: RequestMethod;
  body?: any;
  options?: RequestOptions;
  map?: map;
  decode?: Array<string>;
  bodyHttpParams?: 'fromObject' | 'fromString';
}
