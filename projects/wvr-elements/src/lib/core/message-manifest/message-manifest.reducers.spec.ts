import { Predicate, Update } from '@ngrx/entity';
import { MessageManifest } from './message-manifest';
import { MessageManifestEntry } from './message-manifest-entry';
import { MessageManifestEntryMessage } from './message-manifest-entry-message';
import { MessageMappingStrategy } from './message-mapping-strategy';
import * as MessageManifestReducers from './message-manifest.reducers';
import * as MessageManifestActions from './message-manifest.actions';

describe('Message Manifest Reducer', () => {
  let actionObjectManifest: any;
  let entry1: MessageManifestEntry;
  let entry2: MessageManifestEntry;
  let entry3: MessageManifestEntry;
  let frame: any;
  let manifest: MessageManifest;
  let manifests: Array<MessageManifest>;
  let message: MessageManifestEntryMessage;
  let predicate: Predicate<MessageManifest>;
  let state: any;
  let subscription: any;
  let update: Update<MessageManifest>;
  let updates: Array<Update<MessageManifest>>;
  let weaverPayload: string;

  beforeEach(() => {
    entry1 = {
      name: 'My Library Time',
      destination: '/channel/time'
    };

    entry2 = {
      name: 'Echo',
      destination: '/echo',
    };

    entry3 = {
      name: 'Board',
      destination: '/board'
    };

    frame = {};
    subscription = { id: 'sub-0' };

    manifest = {
      name: 'Directory App STOMP',
      brokerUrl: 'https://api-dev.library.tamu.edu/mylibrary/connect',
      mappingStrategy: 'WEAVER',
      protocol: 'WEB_SOCKET',
      entries: [ entry1, entry2 ],
      connection: {
        status: MessageManifestReducers.ConnectionStatus.DISCONNECTED
      }
    };

    manifests = [
      manifest, {
        ...manifest,
        name: manifest.name + ' 2',
        mappingStrategy: 'JSONPARSE',
        entries: [ entry3 ]
      }
    ];

    predicate = (entity): boolean => {
      return entity.brokerUrl === manifest.brokerUrl;
    };

    state = {
      ids: [],
      entities: {},
      pendingMessages: [],
      currentMessage: undefined
    };

    actionObjectManifest = {
      name: manifest.name,
      brokerUrl: manifest.brokerUrl,
      entries: [
        { ...entry1, mappingStrategy: 'WEAVER' },
        { ...entry2, mappingStrategy: 'WEAVER' }
      ]
    };

    update = {
      id: JSON.stringify(MessageManifestReducers.adapter.selectId),
      changes: { name: manifest.name + ' updated' }
    };

    updates = [
      update, {
        ...update,
        changes: {
          name: manifest.name + ' updated 2'
        }
      }
    ];

    weaverPayload = JSON.stringify({
      meta: {
        status: 'SUCCESS',
        action: null,
        message: 'Your request was successful',
        id: null
      },
      payload: {
        now: 1634218980000
      },
      type: 'HashMap'
    });

    message = {
      manifestName: manifest.name,
      entryName: entry1.name,
      message: weaverPayload
    };
  });

  describe('initial state', () => {
    it('should return the initial state', () => {
      const { initialState } = MessageManifestReducers;
      const action = {} as any;

      expect(MessageManifestReducers.reducer(undefined, action))
        .toBe(initialState);
    });

    it('should select manifest by name', () => {
      expect(MessageManifestReducers.selectManifestByName(manifest))
        .toEqual(manifest.name);
    });

    it('should select current message', () => {
      expect(MessageManifestReducers.selectCurrentMessage(state))
        .toEqual(state.currentMessage);
    });

    it('should select pending message', () => {
      expect(MessageManifestReducers.selectPendingMessage(state))
        .toEqual(state.pendingMessages);
    });
  });

  it('should add manifest', () => {
    const expected = MessageManifestReducers.adapter.addOne(manifest, state);
    const action = MessageManifestActions.addManifest({ manifest });
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should add manifest', () => {
    const expected = MessageManifestReducers.adapter.addOne(manifest, state);
    const action = MessageManifestActions.addManifest({ manifest });
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should add many manifests', () => {
    const expected = MessageManifestReducers.adapter.addMany(manifests, state);
    const action = MessageManifestActions.addManifests({ manifests });
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should clear all manifests', () => {
    const expected = MessageManifestReducers.adapter.removeAll(state);
    const action = MessageManifestActions.clearManifests();
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should delete manifest', () => {
    const expected = MessageManifestReducers.adapter.removeOne(manifest.name, state);
    const action = MessageManifestActions.deleteManifest({ id: manifest.name });
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should delete many manifests', () => {
    const ids = [ manifest.name, manifest.name + ' 2' ];
    const expected = MessageManifestReducers.adapter.removeMany(ids, state);
    const action = MessageManifestActions.deleteManifests({ ids } );
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should delete manifest by predicate', () => {
    const expected = MessageManifestReducers.adapter.removeMany(predicate, state);
    const action = MessageManifestActions.deleteManifestsByPredicate({ predicate });
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should load many manifests', () => {
    const expected = MessageManifestReducers.adapter.setAll(manifests, state);
    const action = MessageManifestActions.loadManifests({ manifests });
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should set manifest', () => {
    const expected = MessageManifestReducers.adapter.setOne(manifest, state);
    const action = MessageManifestActions.setManifest({ manifest });
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should update manifest', () => {
    const expected = MessageManifestReducers.adapter.updateOne(update, state);
    const action = MessageManifestActions.updateManifest({ update });
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should update many manifests', () => {
    const expected = MessageManifestReducers.adapter.updateMany(updates, state);
    const action = MessageManifestActions.updateManifests({ updates });
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should upsert manifest', () => {
    const expected = MessageManifestReducers.adapter.upsertOne(manifest, state);
    const action = MessageManifestActions.upsertManifest({ manifest });
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should upsert many manifests', () => {
    const expected = MessageManifestReducers.adapter.upsertMany(manifests, state);
    const action = MessageManifestActions.upsertManifests({ manifests });
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should receive message', () => {
    state.entities[manifest.name] = manifest;
    update.id = manifest.name;
    update.changes = {
      entries: manifest.entries.map(e => e.name === entry1.name ? { ...e, message: weaverPayload } : e)
    };

    const expected = MessageManifestReducers.adapter.updateOne(update, state);
    const action = MessageManifestActions.receiveMessage({ manifest, entry: entry1, message: weaverPayload });
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should submit a message', () => {
    const action = MessageManifestActions.submitMessage({ message });
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(JSON.stringify(message) === JSON.stringify(reduced.currentMessage))
      .toBe(true);
  });

  it('should process submit message failure', () => {
    state.entities[manifest.name] = manifest;
    update.id = manifest.name;
    update.changes = {
      entries: manifest.entries.map(e => e.name === message.entryName ? { ...e, message } : e)
    };

    const expected = MessageManifestReducers.adapter.updateOne(update, state);
    const action = MessageManifestActions.submitMessageFailure({ manifest, message });
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
    expect(reduced.currentMessage === undefined)
      .toBe(true);
  });

  it('should process submit message failure with an unmatched entry name', () => {
    state.entities[manifest.name] = manifest;
    message.entryName = "Does Not Exist";

    update.id = manifest.name;
    update.changes = {
      entries: manifest.entries.map(e => e.name === message.entryName ? { ...e, message } : e)
    };

    const expected = MessageManifestReducers.adapter.updateOne(update, state);
    const action = MessageManifestActions.submitMessageFailure({ manifest, message });
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
    expect(reduced.currentMessage === undefined)
      .toBe(true);
  });

  it('should process submit message success', () => {
    state.entities[manifest.name] = manifest;
    update.id = manifest.name;
    update.changes = {
      entries: manifest.entries.map(e => e.name === message.entryName ? { ...e, message } : e)
    };

    const expected = MessageManifestReducers.adapter.updateOne(update, state);
    const action = MessageManifestActions.submitMessageSuccess({ manifest, message });
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
    expect(reduced.currentMessage === undefined)
      .toBe(true);
  });

  it('should process submit message success with an unmatched entry name', () => {
    state.entities[manifest.name] = manifest;
    message.entryName = "Does Not Exist";

    update.id = manifest.name;
    update.changes = {
      entries: manifest.entries.map(e => e.name === message.entryName ? { ...e, message } : e)
    };

    const expected = MessageManifestReducers.adapter.updateOne(update, state);
    const action = MessageManifestActions.submitMessageSuccess({ manifest, message });
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
    expect(reduced.currentMessage === undefined)
      .toBe(true);
  });

  it('should queue a message', () => {
    const action = MessageManifestActions.queueMessage({ message });
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(JSON.stringify(message) === JSON.stringify(reduced.pendingMessages[reduced.pendingMessages.length - 1]))
      .toBe(true);
  });

  it('should queue a message with multiple messages', () => {
    state.pendingMessages.push({ ...message, manifestName: manifest.name + ' 2', entryName: entry3.name });
    state.pendingMessages.push({ ...message, entryName: entry2.name });

    const action = MessageManifestActions.queueMessage({ message });
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(JSON.stringify(message) === JSON.stringify(reduced.pendingMessages[reduced.pendingMessages.length - 1]))
      .toBe(true);

    expect(reduced.pendingMessages.length === 3)
      .toBe(true);
  });

  it('should dequeue a message', () => {
    state.pendingMessages.push(message);

    const action = MessageManifestActions.dequeueMessage({ message });
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(reduced.pendingMessages.length === 0)
      .toBe(true);
  });

  it('should dequeue a message with multiple messages', () => {
    state.pendingMessages.push({ ...message, manifestName: manifest.name + ' 2', entryName: entry3.name });
    state.pendingMessages.push({ ...message, entryName: entry2.name });
    state.pendingMessages.push(message);

    const action = MessageManifestActions.dequeueMessage({ message });
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(reduced.pendingMessages.length === 2)
      .toBe(true);
  });

  it('should connect to a manifest', () => {
    update.id = manifest.name;
    update.changes = {
      connection: {
        status: MessageManifestReducers.ConnectionStatus.CONNECTING,
        frame: undefined
      }
    };

    const expected = MessageManifestReducers.adapter.updateOne(update, state);
    const action = MessageManifestActions.connectManifest({ manifest });
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should process connect manifest connected', () => {
    update.id = manifest.name;
    update.changes = {
      connection: {
        status: MessageManifestReducers.ConnectionStatus.CONNECTED,
        frame
      }
    };

    const expected = MessageManifestReducers.adapter.updateOne(update, state);
    const action = MessageManifestActions.connectManifestConnected({ manifest, frame });
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should disconnect to a manifest', () => {
    update.id = manifest.name;
    update.changes = {
      connection: {
        status: MessageManifestReducers.ConnectionStatus.DISCONNECTING,
        frame: undefined
      }
    };

    const expected = MessageManifestReducers.adapter.updateOne(update, state);
    const action = MessageManifestActions.disconnectManifest({ manifest });
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should process disconnect manifest disconnected', () => {
    update.id = manifest.name;
    update.changes = {
      connection: {
        status: MessageManifestReducers.ConnectionStatus.DISCONNECTED,
        frame
      }
    };

    const expected = MessageManifestReducers.adapter.updateOne(update, state);
    const action = MessageManifestActions.disconnectManifestDisconnected({ manifest, frame });
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should process subscribe manifest success', () => {
    state.entities[manifest.name] = manifest;
    update.id = manifest.name;
    update.changes = {
      entries: manifest.entries.map(e => e.name === entry1.name ? { ...e, id: subscription.id } : e)
    };

    const expected = MessageManifestReducers.adapter.updateOne(update, state);
    const action = MessageManifestActions.subscribeManifestSuccess({ manifest, entry: entry1, subscription });
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should process unsubscribe manifest success', () => {
    manifest.entries[0].id = subscription.id;
    state.entities[manifest.name] = manifest;
    update.id = manifest.name;
    update.changes = {
      entries: manifest.entries.filter(e => e.name !== entry1.name)
    };

    const expected = MessageManifestReducers.adapter.updateOne(update, state);
    const action = MessageManifestActions.unsubscribeManifestSuccess({ manifest, entry: entry1 });
    const reduced = MessageManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  // TODO entity MapManifests, Issue #294.
});
