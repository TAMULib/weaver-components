import { StompClientOptions } from './stomp-client-options';
import { StompClientProtocol } from './stomp-client-protocol';
import { StompMappingStrategy } from './stomp-mapping-strategy';

export type map = (response) => any;

export interface StompManifestEntry {
  // A subscription identifier.
  id?: string;
  name: string; // unique.
  description?: string;
  // that path to subscribe to.
  destination: string;
  // mapping strategy to use for deserialization.
  mappingStrategy?: StompMappingStrategy;
  // the last received message.
  message?: any;
  // error from last failed message.
  error?: any;
  map?: map;
}
