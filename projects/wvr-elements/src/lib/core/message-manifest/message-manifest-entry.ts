import { MessageClientOptions } from './message-client-options';
import { MessageClientProtocol } from './message-client-protocol';
import { MessageMappingStrategy } from './message-mapping-strategy';

export type map = (response) => any;

export interface MessageManifestEntry {
  // A subscription identifier.
  id?: string;
  name: string; // unique.
  description?: string;
  // that path to subscribe to.
  destination: string;
  // mapping strategy to use for deserialization.
  mappingStrategy?: MessageMappingStrategy;
  // the last received message.
  message?: any;
  // error from last failed message.
  error?: any;
  map?: map;
}
