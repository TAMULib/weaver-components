import { WvrEntry } from './wvr-entry';

export interface WvrManifest {
  name: string;  // unique
  host: any;
  authorization: any;
  entries: Array<WvrEntry>;
}
