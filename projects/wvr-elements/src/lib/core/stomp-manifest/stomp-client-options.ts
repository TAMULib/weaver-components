type map = (key: string) => any;

export interface StompClientOptions {
  connectHeaders?: map;
  disconnectHeaders?: map;
  heartbeatIncoming?: number;
  heartbeatOutgoing?: number;
  appendMissingNULLonIncoming?: boolean;
}
