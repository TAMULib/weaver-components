import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivationState, Client, IFrame, IMessage, StompHeaders } from '@stomp/stompjs';
import { combineLatest, from, Observable, of } from 'rxjs';
import { RootState } from '../store';
import { StompManifest, StompManifestEntry, StompManifestEntryMessage, StompMappingStrategy } from '../stomp-manifest';
import * as StompManifestActions from '../stomp-manifest/stomp-manifest.actions';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class StompService {
  private readonly clients: Map<string, Client>;

  constructor(private readonly store: Store<RootState>) {
    this.clients = new Map();
  }

  /**
   * Connect to the given broker.
   *
   * @param manifest The Stomp Manifest.
   *
   * @return An empty observable.
   */
  connect(manifest: StompManifest): Observable<void> {
    const stompConfig = {
      brokerUrl: manifest.brokerUrl,
      // disable reconnectDelay to allow for custom attempts at connecting to avoid infinitely attempting reconnect.
      reconnectDelay: 0
    };

    if (!!manifest.options) {
      const keys = [ 'connectHeaders', 'disconnectHeaders', 'heartbeatIncoming', 'heartbeatOutgoing', 'appendMissingNULLonIncoming' ];
      for (const key of keys) {
        if (!!manifest.options[key]) {
          stompConfig[key] = manifest.options[key];
        }
      }
    }

    const client = this.createClient(manifest, stompConfig);

    client.activate();

    return of();
  }

  /**
   * Disconnect from the given broker, completel unsubscribing before disconnecting.
   *
   * @param manifest The Stomp Manifest.
   */
  disconnect(manifest: StompManifest): Observable<any> {
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
   * @param manifest The Stomp Manifest.
   * @param entry The Stomp Manifest Entry.
   */
  subscribe(manifest: StompManifest, entry: StompManifestEntry): Observable<any> {
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

        this.store.dispatch(StompManifestActions.receiveMessage({
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
   * @param manifest The stomp manifest to get the client of.
   * @param id The identifier to unsubscribe from.
   *
   * @return The response from unsubscribe.
   */
  unsubscribe(manifest: StompManifest, id: string): Observable<any> {
    // tslint:disable:no-void-expression
    return of(this.clients
      .get(manifest.name)
      .unsubscribe(id)
    );
  }

  /**
   * Create a stomp client using the given manifest and configuration.
   *
   * The onConnect() and onDisconnect will be custom built.
   * All other helpers will bind to the methods on the StompService.
   *
   * The websocket factory will be assigned to SockJS.
   *
   * @param manifest The stomp manifest to create a client for.
   * @param config The stomp configuration.
   *
   * @return The created stomp client.
   */
  createClient = (manifest: StompManifest, config: any): Client => {
    const client = new Client();

    // tslint:disable:unnecessary-bind
    client.beforeConnect = this.beforeConnect.bind(this);
    client.onChangeState = this.onChangeState.bind(this);
    client.debug = this.debug.bind(this);
    client.onStompError = this.onStompError.bind(this);
    client.onWebSocketClose = this.onWebSocketClose.bind(this);
    client.onWebSocketError = this.onWebSocketError.bind(this);

    client.onConnect = (frame: IFrame): void => {
      this.store.dispatch(StompManifestActions.connectManifestConnected({
        manifest,
        frame: {
          command: frame.command,
          headers: frame.headers
        }
      }));
    };

    client.onDisconnect = (frame: IFrame): void => {
      this.store.dispatch(StompManifestActions.disconnectManifestDisconnected({
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
   * @param manifest The Stomp Manifest.
   *
   * @return An empty observable.
   */
  deleteClient = (manifest: StompManifest): Observable<void> => {
    this.clients.delete(manifest.name);

    return of();
  };

  // tslint:disable:no-empty
  // tslint:disable:invalid-void
  /**
   * Callback passed to the Stomp client to for beforeConnect() calls.
   *
   * @return May return a promise for asynchronous operation.
   */
  beforeConnect = (): void | Promise<void> => {
  };

  // tslint:disable:no-empty
  /**
   * Callback passed to the Stomp client to for onChangeState() calls.
   *
   * @param state The activation state triggering the state change.
   */
  onChangeState = (state: ActivationState): void => {
  };

  // tslint:disable:no-empty
  /**
   * Callback passed to the Stomp client to for debug() calls.
   *
   * @param message The message sent by the Stomp client debugger.
   */
  debug = (message: string): void => {
  };

  // tslint:disable:no-empty
  /**
   * Callback passed to the Stomp client to for onStompError() calls.
   *
   * @param frame The stomp frame relating to the error.
   */
  onStompError = (frame: IFrame): void => {
  };

  // tslint:disable:no-empty
  /**
   * Callback passed to the Stomp client to for onWebSocketClose() calls.
   *
   * @param event The event triggering the web socket close.
   */
  onWebSocketClose = (event: any): void => {
  };

  // tslint:disable:no-empty
  /**
   * Callback passed to the Stomp client to for onWebSocketError() calls.
   *
   * @param event The event triggering the web socket error.
   */
  onWebSocketError = (event: any): void => {
  };
}
