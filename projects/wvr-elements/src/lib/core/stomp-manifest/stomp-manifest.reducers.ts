import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { StompManifest } from './stomp-manifest';
import { StompManifestEntryMessage } from './stomp-manifest-entry-message';
import * as StompManifestActions from './stomp-manifest.actions';

export enum ConnectionStatus {
  CONNECTED = 'CONNECTED',
  CONNECTING = 'CONNECTING',
  DISCONNECTED = 'DISCONNECTED',
  DISCONNECTING = 'DISCONNECTING'
}

export interface StompManifestState extends EntityState<StompManifest> {
  pendingMessages: Array<StompManifestEntryMessage>;
  currentMessage: StompManifestEntryMessage;
}

// tslint:disable-next-line:only-arrow-functions
export function selectManifestByName(manifest: StompManifest): string {
  return manifest.name;
}

export const adapter: EntityAdapter<StompManifest> = createEntityAdapter<StompManifest>({
  selectId: selectManifestByName
});

export const initialState: StompManifestState = adapter.getInitialState({
  pendingMessages: [],
  currentMessage: undefined
});

const stompManifestReducer = createReducer(
  initialState,
  on(StompManifestActions.addManifest, (state, { manifest }) => adapter.addOne(manifest, state)),
  on(StompManifestActions.addManifests, (state, { manifests }) => adapter.addMany(manifests, state)),
  on(StompManifestActions.clearManifests, state => adapter.removeAll({ ...state, selectedStompManifestId: undefined })),
  on(StompManifestActions.deleteManifest, (state, { id }) => adapter.removeOne(id, state)),
  on(StompManifestActions.deleteManifests, (state, { ids }) => adapter.removeMany(ids, state)),
  on(StompManifestActions.deleteManifestsByPredicate, (state, { predicate }) => adapter.removeMany(predicate, state)),
  on(StompManifestActions.loadManifests, (state, { manifests }) => adapter.setAll(manifests, state)),
  on(StompManifestActions.mapManifest, (state, { entityMap }) => adapter.mapOne(entityMap, state)),
  on(StompManifestActions.mapManifests, (state, { entityMap }) => adapter.map(entityMap, state)),
  on(StompManifestActions.setManifest, (state, { manifest }) => adapter.setOne(manifest, state)),
  on(StompManifestActions.updateManifest, (state, { update }) => adapter.updateOne(update, state)),
  on(StompManifestActions.updateManifests, (state, { updates }) => adapter.updateMany(updates, state)),
  on(StompManifestActions.upsertManifest, (state, { manifest }) => adapter.upsertOne(manifest, state)),
  on(StompManifestActions.upsertManifests, (state, { manifests }) => adapter.upsertMany(manifests, state)),
  // tslint:disable-next-line:arrow-return-shorthand
  on(StompManifestActions.receiveMessage, (state, { manifest, entry, message }) => {
    return adapter.updateOne({
      id: manifest.name,
      changes: {
        entries: state.entities[manifest.name].entries.map(e => e.name === entry.name ? { ...e, message } : e)
      }
    }, {
      ...state,
      currentMessage: undefined
    });
  }),
  // tslint:disable-next-line:arrow-return-shorthand
  on(StompManifestActions.submitMessage, (state, { message }) => {
    return {
      ...state,
      currentMessage: message
    // tslint:disable-next-line:semicolon
    }
  }),
  // tslint:disable-next-line:arrow-return-shorthand
  on(StompManifestActions.submitMessageSuccess, (state, { manifest, message }) => {
    return adapter.updateOne({
      id: manifest.name,
      changes: {
        entries: state.entities[manifest.name].entries.map(e => e.name === message.entryName ? { ...e, message } : e)
      }
    }, {
      ...state,
      currentMessage: undefined
    });
  }),
  // tslint:disable-next-line:arrow-return-shorthand
  on(StompManifestActions.submitMessageFailure, (state, { manifest, message }) => {
    return adapter.updateOne({
      id: manifest.name,
      changes: {
        entries: state.entities[manifest.name].entries.map(e => e.name === message.entryName ? { ...e, message } : e)
      }
    }, {
      ...state,
      currentMessage: undefined
    });
  }),
  // tslint:disable-next-line:arrow-return-shorthand
  on(StompManifestActions.queueMessage, (state, { message }) => {
    return {
      ...state,
      pendingMessages: state.pendingMessages.concat([{ ...message }]),
      currentMessage: undefined
    };
  }),
  // tslint:disable-next-line:arrow-return-shorthand
  on(StompManifestActions.dequeueMessage, (state, { message }) => {
    return {
      ...state,
      pendingMessages: state.pendingMessages.filter(m => m.manifestName !== message.manifestName || m.entryName !== message.entryName)
    };
  }),
  // tslint:disable-next-line:arrow-return-shorthand
  on(StompManifestActions.connectManifest, (state, { manifest }) => {
    return adapter.updateOne({
      id: manifest.name,
      changes: {
        connection: {
          status: ConnectionStatus.CONNECTING,
          frame: undefined
        }
      }
    }, {
      ...state
    });
  }),
  // tslint:disable-next-line:arrow-return-shorthand
  on(StompManifestActions.connectManifestConnected, (state, { manifest, frame }) => {
    return adapter.updateOne({
      id: manifest.name,
      changes: {
        connection: {
          status: ConnectionStatus.CONNECTED,
          frame
        }
      }
    }, {
      ...state
    });
  }),
  // tslint:disable-next-line:arrow-return-shorthand
  on(StompManifestActions.disconnectManifest, (state, { manifest }) => {
    return adapter.updateOne({
      id: manifest.name,
      changes: {
        connection: {
          status: ConnectionStatus.DISCONNECTING,
          frame: undefined
        }
      }
    }, {
      ...state
    });
  }),
  // tslint:disable-next-line:arrow-return-shorthand
  on(StompManifestActions.disconnectManifestDisconnected, (state, { manifest, frame }) => {
    return adapter.updateOne({
      id: manifest.name,
      changes: {
        connection: {
          status: ConnectionStatus.DISCONNECTED,
          frame
        }
      }
    }, {
      ...state
    });
  }),
  // tslint:disable-next-line:arrow-return-shorthand
  on(StompManifestActions.subscribeManifestSuccess, (state, { manifest, entry, subscription }) => {
    return adapter.updateOne({
      id: manifest.name,
      changes: {
        entries: state.entities[manifest.name].entries.map(e => e.name === entry.name ? { ...e, id: subscription.id } : e)
      }
    }, {
      ...state
    });
  }),
  // tslint:disable-next-line:arrow-return-shorthand
  on(StompManifestActions.unsubscribeManifestSuccess, (state, { manifest, entry }) => {
    return adapter.updateOne({
      id: manifest.name,
      changes: {
        entries: manifest.entries.filter(e => e.name !== entry.name)
      }
    }, {
      ...state
    });
  })
);

// tslint:disable-next-line:typedef
export function reducer(state: StompManifestState | undefined, action: Action) {
  return stompManifestReducer(state, action);
}

// get the selectors.
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

// select the array of stomp manifest names.
export const selectManifestNames = selectIds;

// select the dictionary of stomp manifest subscriptions.
export const selectManifestEntities = selectEntities;

// select the array of stomp stompManifests.
export const selectAllManifests = selectAll;

// select the total stomp manifest count.
export const selectManifestTotal = selectTotal;

export const selectCurrentMessage = (state: StompManifestState) => state.currentMessage;

export const selectPendingMessage = (state: StompManifestState) => state.pendingMessages;
