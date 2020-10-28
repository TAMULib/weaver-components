import { ManifestEntry } from './manifest-entry';

export interface Manifest {
  name: string; // unique
  description?: string;
  baseUrl: string;
  authorization?: any;
  entries: Array<ManifestEntry>;
}
