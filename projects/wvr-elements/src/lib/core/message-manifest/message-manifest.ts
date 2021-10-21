import { MessageClientOptions } from './message-client-options';
import { MessageClientProtocol } from './message-client-protocol';
import { MessageManifestEntry } from './message-manifest-entry';
import { MessageMappingStrategy } from './message-mapping-strategy';
import { ConnectionStatus } from './message-manifest.reducers';

export interface MessageManifest {
  name: string; // unique
  description?: string;
  brokerUrl: string;
  connection: {
    status: ConnectionStatus;
    frame?: any;
  };
  entries: Array<MessageManifestEntry>;
  options?: MessageClientOptions;
  protocol?: MessageClientProtocol;
  mappingStrategy?: MessageMappingStrategy;
}
