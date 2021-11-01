import { Action } from '@ngrx/store';
import { MessageClientOptions } from './message-client-options';
import { MessageClientProtocol } from './message-client-protocol';

export interface MessageManifestEntryMessage {
  manifestName?: string;
  entryName: string;
  message: string;
}
