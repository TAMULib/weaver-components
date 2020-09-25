import { Action } from '@ngrx/store';
import { WvrRequest } from '../rest/wvr-request';

export interface WvrEntryRequest {
  id?: number;
  manifestName?: string;
  entryName: string;
  onSuccess: Array<Action>;
  onFailure: Array<Action>;
  request: WvrRequest;
}
