import { Predicate, Update } from '@ngrx/entity';
import { StompManifest } from './stomp-manifest';
import { StompManifestEntry } from './stomp-manifest-entry';
import { StompManifestEntryMessage } from './stomp-manifest-entry-message';
import { StompMappingStrategy } from './stomp-mapping-strategy';
import * as StompManifestReducers from './stomp-manifest.reducers';
import * as StompManifestActions from './stomp-manifest.actions';

describe('Stomp Manifest Reducer', () => {
  let actionObjectManifest: any;
  let entry1: StompManifestEntry;
  let entry2: StompManifestEntry;
  let entry3: StompManifestEntry;
  let frame: any;
  let manifest: StompManifest;
  let manifests: Array<StompManifest>;
  let message: StompManifestEntryMessage;
  let predicate: Predicate<StompManifest>;
  let state: any;
  let subscription: any;
  let update: Update<StompManifest>;
  let updates: Array<Update<StompManifest>>;
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
        status: StompManifestReducers.ConnectionStatus.DISCONNECTED
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
      id: JSON.stringify(StompManifestReducers.adapter.selectId),
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
      const { initialState } = StompManifestReducers;
      const action = {} as any;

      expect(StompManifestReducers.reducer(undefined, action))
        .toBe(initialState);
    });

    it('should select manifest by name', () => {
      expect(StompManifestReducers.selectManifestByName(manifest))
        .toEqual(manifest.name);
    });

    it('should select current message', () => {
      expect(StompManifestReducers.selectCurrentMessage(state))
        .toEqual(state.currentMessage);
    });

    it('should select pending message', () => {
      expect(StompManifestReducers.selectPendingMessage(state))
        .toEqual(state.pendingMessages);
    });
  });

  it('should add manifest', () => {
    const expected = StompManifestReducers.adapter.addOne(manifest, state);
    const action = StompManifestActions.addManifest({ manifest });
    const reduced = StompManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should add manifest', () => {
    const expected = StompManifestReducers.adapter.addOne(manifest, state);
    const action = StompManifestActions.addManifest({ manifest });
    const reduced = StompManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should add many manifests', () => {
    const expected = StompManifestReducers.adapter.addMany(manifests, state);
    const action = StompManifestActions.addManifests({ manifests });
    const reduced = StompManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should clear all manifests', () => {
    const expected = StompManifestReducers.adapter.removeAll(state);
    const action = StompManifestActions.clearManifests();
    const reduced = StompManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should delete manifest', () => {
    const expected = StompManifestReducers.adapter.removeOne(manifest.name, state);
    const action = StompManifestActions.deleteManifest({ id: manifest.name });
    const reduced = StompManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should delete many manifests', () => {
    const ids = [ manifest.name, manifest.name + ' 2' ];
    const expected = StompManifestReducers.adapter.removeMany(ids, state);
    const action = StompManifestActions.deleteManifests({ ids } );
    const reduced = StompManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should delete manifest by predicate', () => {
    const expected = StompManifestReducers.adapter.removeMany(predicate, state);
    const action = StompManifestActions.deleteManifestsByPredicate({ predicate });
    const reduced = StompManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should load many manifests', () => {
    const expected = StompManifestReducers.adapter.setAll(manifests, state);
    const action = StompManifestActions.loadManifests({ manifests });
    const reduced = StompManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should set manifest', () => {
    const expected = StompManifestReducers.adapter.setOne(manifest, state);
    const action = StompManifestActions.setManifest({ manifest });
    const reduced = StompManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should update manifest', () => {
    const expected = StompManifestReducers.adapter.updateOne(update, state);
    const action = StompManifestActions.updateManifest({ update });
    const reduced = StompManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should update many manifests', () => {
    const expected = StompManifestReducers.adapter.updateMany(updates, state);
    const action = StompManifestActions.updateManifests({ updates });
    const reduced = StompManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should upsert manifest', () => {
    const expected = StompManifestReducers.adapter.upsertOne(manifest, state);
    const action = StompManifestActions.upsertManifest({ manifest });
    const reduced = StompManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should upsert many manifests', () => {
    const expected = StompManifestReducers.adapter.upsertMany(manifests, state);
    const action = StompManifestActions.upsertManifests({ manifests });
    const reduced = StompManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should receive message', () => {
    state.entities[manifest.name] = manifest;
    update.id = manifest.name;
    update.changes = {
      entries: manifest.entries.map(e => e.name === entry1.name ? { ...e, message: weaverPayload } : e)
    };

    const expected = StompManifestReducers.adapter.updateOne(update, state);
    const action = StompManifestActions.receiveMessage({ manifest, entry: entry1, message: weaverPayload });
    const reduced = StompManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should submit a message', () => {
    const action = StompManifestActions.submitMessage({ message });
    const reduced = StompManifestReducers.reducer(state, action);

    expect(JSON.stringify(message) === JSON.stringify(reduced.currentMessage))
      .toBe(true);
  });

  it('should process submit message failure', () => {
    state.entities[manifest.name] = manifest;
    update.id = manifest.name;
    update.changes = {
      entries: manifest.entries.map(e => e.name === message.entryName ? { ...e, message } : e)
    };

    const expected = StompManifestReducers.adapter.updateOne(update, state);
    const action = StompManifestActions.submitMessageFailure({ manifest, message });
    const reduced = StompManifestReducers.reducer(state, action);

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

    const expected = StompManifestReducers.adapter.updateOne(update, state);
    const action = StompManifestActions.submitMessageFailure({ manifest, message });
    const reduced = StompManifestReducers.reducer(state, action);

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

    const expected = StompManifestReducers.adapter.updateOne(update, state);
    const action = StompManifestActions.submitMessageSuccess({ manifest, message });
    const reduced = StompManifestReducers.reducer(state, action);

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

    const expected = StompManifestReducers.adapter.updateOne(update, state);
    const action = StompManifestActions.submitMessageSuccess({ manifest, message });
    const reduced = StompManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
    expect(reduced.currentMessage === undefined)
      .toBe(true);
  });

  it('should queue a message', () => {
    const action = StompManifestActions.queueMessage({ message });
    const reduced = StompManifestReducers.reducer(state, action);

    expect(JSON.stringify(message) === JSON.stringify(reduced.pendingMessages[reduced.pendingMessages.length - 1]))
      .toBe(true);
  });

  it('should queue a message with multiple messages', () => {
    state.pendingMessages.push({ ...message, manifestName: manifest.name + ' 2', entryName: entry3.name });
    state.pendingMessages.push({ ...message, entryName: entry2.name });

    const action = StompManifestActions.queueMessage({ message });
    const reduced = StompManifestReducers.reducer(state, action);

    expect(JSON.stringify(message) === JSON.stringify(reduced.pendingMessages[reduced.pendingMessages.length - 1]))
      .toBe(true);

    expect(reduced.pendingMessages.length === 3)
      .toBe(true);
  });

  it('should dequeue a message', () => {
    state.pendingMessages.push(message);

    const action = StompManifestActions.dequeueMessage({ message });
    const reduced = StompManifestReducers.reducer(state, action);

    expect(reduced.pendingMessages.length === 0)
      .toBe(true);
  });

  it('should dequeue a message with multiple messages', () => {
    state.pendingMessages.push({ ...message, manifestName: manifest.name + ' 2', entryName: entry3.name });
    state.pendingMessages.push({ ...message, entryName: entry2.name });
    state.pendingMessages.push(message);

    const action = StompManifestActions.dequeueMessage({ message });
    const reduced = StompManifestReducers.reducer(state, action);

    expect(reduced.pendingMessages.length === 2)
      .toBe(true);
  });

  it('should connect to a manifest', () => {
    update.id = manifest.name;
    update.changes = {
      connection: {
        status: StompManifestReducers.ConnectionStatus.CONNECTING,
        frame: undefined
      }
    };

    const expected = StompManifestReducers.adapter.updateOne(update, state);
    const action = StompManifestActions.connectManifest({ manifest });
    const reduced = StompManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should process connect manifest connected', () => {
    update.id = manifest.name;
    update.changes = {
      connection: {
        status: StompManifestReducers.ConnectionStatus.CONNECTED,
        frame
      }
    };

    const expected = StompManifestReducers.adapter.updateOne(update, state);
    const action = StompManifestActions.connectManifestConnected({ manifest, frame });
    const reduced = StompManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should disconnect to a manifest', () => {
    update.id = manifest.name;
    update.changes = {
      connection: {
        status: StompManifestReducers.ConnectionStatus.DISCONNECTING,
        frame: undefined
      }
    };

    const expected = StompManifestReducers.adapter.updateOne(update, state);
    const action = StompManifestActions.disconnectManifest({ manifest });
    const reduced = StompManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should process disconnect manifest disconnected', () => {
    update.id = manifest.name;
    update.changes = {
      connection: {
        status: StompManifestReducers.ConnectionStatus.DISCONNECTED,
        frame
      }
    };

    const expected = StompManifestReducers.adapter.updateOne(update, state);
    const action = StompManifestActions.disconnectManifestDisconnected({ manifest, frame });
    const reduced = StompManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should process subscribe manifest success', () => {
    state.entities[manifest.name] = manifest;
    update.id = manifest.name;
    update.changes = {
      entries: manifest.entries.map(e => e.name === entry1.name ? { ...e, id: subscription.id } : e)
    };

    const expected = StompManifestReducers.adapter.updateOne(update, state);
    const action = StompManifestActions.subscribeManifestSuccess({ manifest, entry: entry1, subscription });
    const reduced = StompManifestReducers.reducer(state, action);

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

    const expected = StompManifestReducers.adapter.updateOne(update, state);
    const action = StompManifestActions.unsubscribeManifestSuccess({ manifest, entry: entry1 });
    const reduced = StompManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  // TODO entity MapManifests, Issue #294.
});
