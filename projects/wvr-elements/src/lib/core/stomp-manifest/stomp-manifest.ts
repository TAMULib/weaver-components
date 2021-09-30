import { StompClientOptions } from './stomp-client-options';
import { StompClientProtocol } from './stomp-client-protocol';
import { StompManifestEntry } from './stomp-manifest-entry';
import { StompMappingStrategy } from './stomp-mapping-strategy';
import { ConnectionStatus } from './stomp-manifest.reducers';

export interface StompManifest {
  name: string; // unique
  description?: string;
  brokerUrl: string;
  connection: {
    status: ConnectionStatus;
    frame?: any;
  };
  entries: Array<StompManifestEntry>;
  options?: StompClientOptions;
  protocol?: StompClientProtocol;
  mappingStrategy?: StompMappingStrategy;
}
