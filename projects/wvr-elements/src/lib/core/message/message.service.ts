import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivationState, Client, IFrame, IMessage, StompHeaders } from '@stomp/stompjs';
import { combineLatest, from, Observable, of } from 'rxjs';
import { RootState } from '../store';
import { MessageManifest, MessageManifestEntry, MessageManifestEntryMessage, MessageMappingStrategy } from '../message-manifest';
import * as MessageManifestActions from '../message-manifest/message-manifest.actions';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private readonly clients: Map<string, Client>;

  constructor(private readonly store: Store<RootState>) {
    this.clients = new Map();
  }

  /**
   * Connect to the given broker.
   *
   * @param manifest The Message Manifest.
   *
   * @return An empty observable.
   */
  connect(manifest: MessageManifest): Observable<void> {
    const messageConfig = {
      brokerUrl: manifest.brokerUrl,
      // disable reconnectDelay to allow for custom attempts at connecting to avoid infinitely attempting reconnect.
      reconnectDelay: 0
    };

    if (!!manifest.options) {
      const keys = [ 'connectHeaders', 'disconnectHeaders', 'heartbeatIncoming', 'heartbeatOutgoing', 'appendMissingNULLonIncoming' ];
      for (const key of keys) {
        if (!!manifest.options[key]) {
          messageConfig[key] = manifest.options[key];
        }
      }
    }

    const client = this.createClient(manifest, messageConfig);

    client.activate();

    return of();
  }

  /**
   * Disconnect from the given broker, completel unsubscribing before disconnecting.
   *
   * @param manifest The Message Manifest.
   */
  disconnect(manifest: MessageManifest): Observable<any> {
    const unsubscriptions = manifest.entries.filter(entry => !!entry.id)
        .map(entry => entry.id)
        .map(id => this.unsubscribe(manifest, id));

    return combineLatest(unsubscriptions)
      .pipe(() => from(this.clients
        .get(manifest.name)
        .deactivate()
      ));
  }

  /**
   * Subscribe to the given destination.
   *
   * @param manifest The Message Manifest.
   * @param entry The Message Manifest Entry.
   */
  subscribe(manifest: MessageManifest, entry: MessageManifestEntry): Observable<any> {
    return of(this.clients
      .get(manifest.name)
      .subscribe(entry.destination, (response: IMessage) => {
        let message: any = response.body;

        if (entry.mappingStrategy === 'WEAVER') {
          const parsed = JSON.parse(response.body);

          message = {
            meta: parsed.meta,
            payload: parsed.payload[Object.keys(parsed.payload)[0]],
            type: Object.keys(parsed.payload)[0]
          };
        } else if (entry.mappingStrategy === 'JSONPARSE') {
          message = JSON.parse(response.body);
        }

        this.store.dispatch(MessageManifestActions.receiveMessage({
          manifest,
          entry,
          message
        }));
      })
    );
  }

  /**
   * Unsubscribe a given identifier.
   *
   * @param manifest The message manifest to get the client of.
   * @param id The identifier to unsubscribe from.
   *
   * @return The response from unsubscribe.
   */
  unsubscribe(manifest: MessageManifest, id: string): Observable<any> {
    // tslint:disable:no-void-expression
    return of(this.clients
      .get(manifest.name)
      .unsubscribe(id)
    );
  }

  /**
   * Create a message client using the given manifest and configuration.
   *
   * The onConnect() and onDisconnect will be custom built.
   * All other helpers will bind to the methods on the MessageService.
   *
   * The websocket factory will be assigned to SockJS.
   *
   * @param manifest The message manifest to create a client for.
   * @param config The message configuration.
   *
   * @return The created message client.
   */
  createClient = (manifest: MessageManifest, config: any): Client => {
    const client = new Client();

    // tslint:disable:unnecessary-bind
    client.beforeConnect = this.beforeConnect.bind(this);
    client.onChangeState = this.onChangeState.bind(this);
    client.debug = this.debug.bind(this);
    client.onStompError = this.onStompError.bind(this);
    client.onWebSocketClose = this.onWebSocketClose.bind(this);
    client.onWebSocketError = this.onWebSocketError.bind(this);

    client.onConnect = (frame: IFrame): void => {
      this.store.dispatch(MessageManifestActions.connectManifestConnected({
        manifest,
        frame: {
          command: frame.command,
          headers: frame.headers
        }
      }));
    };

    client.onDisconnect = (frame: IFrame): void => {
      this.store.dispatch(MessageManifestActions.disconnectManifestDisconnected({
        manifest,
        frame: {
          command: frame.command,
          headers: frame.headers
        }
      }));
    };

    client.configure(config);
    client.webSocketFactory = () => new SockJS(config.brokerUrl);

    this.clients.set(manifest.name, client);

    return client;
  };

  /**
   * Delete client from the manifest.
   *
   * @param manifest The Message Manifest.
   *
   * @return An empty observable.
   */
  deleteClient = (manifest: MessageManifest): Observable<void> => {
    this.clients.delete(manifest.name);

    return of();
  };

  // tslint:disable:no-empty
  // tslint:disable:invalid-void
  /**
   * Callback passed to the Message client to for beforeConnect() calls.
   *
   * @return May return a promise for asynchronous operation.
   */
  beforeConnect = (): void | Promise<void> => {
  };

  // tslint:disable:no-empty
  /**
   * Callback passed to the Message client to for onChangeState() calls.
   *
   * @param state The activation state triggering the state change.
   */
  onChangeState = (state: ActivationState): void => {
  };

  // tslint:disable:no-empty
  /**
   * Callback passed to the Message client to for debug() calls.
   *
   * @param message The message sent by the Message client debugger.
   */
  debug = (message: string): void => {
  };

  // tslint:disable:no-empty
  /**
   * Callback passed to the Message client to for onStompError() calls.
   *
   * @param frame The message frame relating to the error.
   */
  onStompError = (frame: IFrame): void => {
  };

  // tslint:disable:no-empty
  /**
   * Callback passed to the Message client to for onWebSocketClose() calls.
   *
   * @param event The event triggering the web socket close.
   */
  onWebSocketClose = (event: any): void => {
  };

  // tslint:disable:no-empty
  /**
   * Callback passed to the Message client to for onWebSocketError() calls.
   *
   * @param event The event triggering the web socket error.
   */
  onWebSocketError = (event: any): void => {
  };
}
