import { RequestMethod } from '../rest/request-method';
import { RequestOptions } from '../rest/request-options';

export interface ManifestEntry {
  name: string; // unique
  description?: string;
  path: string;
  // allowed methods for entry
  methods: Array<RequestMethod>;
  // options defined by manifest to be merged with request
  options?: RequestOptions;
  // last request submitted
  request?: any;
  // response from last successful request
  response?: any;
  // error from last failed request
  error?: any;
}
