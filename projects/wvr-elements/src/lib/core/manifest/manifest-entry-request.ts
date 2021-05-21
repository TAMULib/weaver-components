import { Action } from '@ngrx/store';
import { RequestMethod } from '../rest/request-method';
import { RequestOptions } from '../rest/request-options';

export interface ManifestEntryRequest {
  manifestName?: string;
  entryName: string;
  method?: RequestMethod;
  body?: any;
  options?: RequestOptions;
  decode?: Array<string>;
  bodyHttpParams?: 'fromObject' | 'fromString';
  onSuccess?: Array<Action>;
  onFailure?: Array<Action>;
}
