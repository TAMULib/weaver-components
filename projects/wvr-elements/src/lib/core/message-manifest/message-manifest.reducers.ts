import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { MessageManifest } from './message-manifest';
import { MessageManifestEntryMessage } from './message-manifest-entry-message';
import * as MessageManifestActions from './message-manifest.actions';

export enum ConnectionStatus {
  CONNECTED = 'CONNECTED',
  CONNECTING = 'CONNECTING',
  DISCONNECTED = 'DISCONNECTED',
  DISCONNECTING = 'DISCONNECTING'
}

export interface MessageManifestState extends EntityState<MessageManifest> {
  pendingMessages: Array<MessageManifestEntryMessage>;
  currentMessage: MessageManifestEntryMessage;
}

// tslint:disable-next-line:only-arrow-functions
export function selectManifestByName(manifest: MessageManifest): string {
  return manifest.name;
}

export const adapter: EntityAdapter<MessageManifest> = createEntityAdapter<MessageManifest>({
  selectId: selectManifestByName
});

export const initialState: MessageManifestState = adapter.getInitialState({
  pendingMessages: [],
  currentMessage: undefined
});

const messageManifestReducer = createReducer(
  initialState,
  on(MessageManifestActions.addManifest, (state, { manifest }) => adapter.addOne(manifest, state)),
  on(MessageManifestActions.addManifests, (state, { manifests }) => adapter.addMany(manifests, state)),
  on(MessageManifestActions.clearManifests, state => adapter.removeAll({ ...state, selectedMessageManifestId: undefined })),
  on(MessageManifestActions.deleteManifest, (state, { id }) => adapter.removeOne(id, state)),
  on(MessageManifestActions.deleteManifests, (state, { ids }) => adapter.removeMany(ids, state)),
  on(MessageManifestActions.deleteManifestsByPredicate, (state, { predicate }) => adapter.removeMany(predicate, state)),
  on(MessageManifestActions.loadManifests, (state, { manifests }) => adapter.setAll(manifests, state)),
  on(MessageManifestActions.mapManifest, (state, { entityMap }) => adapter.mapOne(entityMap, state)),
  on(MessageManifestActions.mapManifests, (state, { entityMap }) => adapter.map(entityMap, state)),
  on(MessageManifestActions.setManifest, (state, { manifest }) => adapter.setOne(manifest, state)),
  on(MessageManifestActions.updateManifest, (state, { update }) => adapter.updateOne(update, state)),
  on(MessageManifestActions.updateManifests, (state, { updates }) => adapter.updateMany(updates, state)),
  on(MessageManifestActions.upsertManifest, (state, { manifest }) => adapter.upsertOne(manifest, state)),
  on(MessageManifestActions.upsertManifests, (state, { manifests }) => adapter.upsertMany(manifests, state)),
  // tslint:disable-next-line:arrow-return-shorthand
  on(MessageManifestActions.receiveMessage, (state, { manifest, entry, message }) => {
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
  on(MessageManifestActions.submitMessage, (state, { message }) => {
    return {
      ...state,
      currentMessage: message
    // tslint:disable-next-line:semicolon
    }
  }),
  // tslint:disable-next-line:arrow-return-shorthand
  on(MessageManifestActions.submitMessageSuccess, (state, { manifest, message }) => {
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
  on(MessageManifestActions.submitMessageFailure, (state, { manifest, message }) => {
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
  on(MessageManifestActions.queueMessage, (state, { message }) => {
    return {
      ...state,
      pendingMessages: state.pendingMessages.concat([{ ...message }]),
      currentMessage: undefined
    };
  }),
  // tslint:disable-next-line:arrow-return-shorthand
  on(MessageManifestActions.dequeueMessage, (state, { message }) => {
    return {
      ...state,
      pendingMessages: state.pendingMessages.filter(m => m.manifestName !== message.manifestName || m.entryName !== message.entryName)
    };
  }),
  // tslint:disable-next-line:arrow-return-shorthand
  on(MessageManifestActions.connectManifest, (state, { manifest }) => {
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
  on(MessageManifestActions.connectManifestConnected, (state, { manifest, frame }) => {
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
  on(MessageManifestActions.disconnectManifest, (state, { manifest }) => {
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
  on(MessageManifestActions.disconnectManifestDisconnected, (state, { manifest, frame }) => {
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
  on(MessageManifestActions.subscribeManifestSuccess, (state, { manifest, entry, subscription }) => {
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
  on(MessageManifestActions.unsubscribeManifestSuccess, (state, { manifest, entry }) => {
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
export function reducer(state: MessageManifestState | undefined, action: Action) {
  return messageManifestReducer(state, action);
}

// get the selectors.
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

// select the array of message manifest names.
export const selectManifestNames = selectIds;

// select the dictionary of message manifest subscriptions.
export const selectManifestEntities = selectEntities;

// select the array of message messageManifests.
export const selectAllManifests = selectAll;

// select the total message manifest count.
export const selectManifestTotal = selectTotal;

export const selectCurrentMessage = (state: MessageManifestState) => state.currentMessage;

export const selectPendingMessage = (state: MessageManifestState) => state.pendingMessages;
