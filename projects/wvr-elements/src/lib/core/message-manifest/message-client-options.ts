type map = (key: string) => any;

export interface MessageClientOptions {
  connectHeaders?: map;
  disconnectHeaders?: map;
  heartbeatIncoming?: number;
  heartbeatOutgoing?: number;
  appendMissingNULLonIncoming?: boolean;
}
