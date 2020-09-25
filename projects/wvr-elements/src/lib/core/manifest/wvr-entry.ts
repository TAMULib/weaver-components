import { WvrRequestManifest } from '../rest/wvr-request';

export interface WvrEntry {
  name: string;
  manifestName: string;
  requestManifest: WvrRequestManifest;
}
