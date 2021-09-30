import { Action } from '@ngrx/store';
import { StompClientOptions } from './stomp-client-options';
import { StompClientProtocol } from './stomp-client-protocol';

export interface StompManifestEntryMessage {
  manifestName?: string;
  entryName: string;
  message: string;
}
