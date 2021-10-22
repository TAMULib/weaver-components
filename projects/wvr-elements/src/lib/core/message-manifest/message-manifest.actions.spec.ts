import { Predicate, Update } from '@ngrx/entity';
import { MessageManifest } from './message-manifest';
import { MessageManifestEntry } from './message-manifest-entry';
import { MessageManifestEntryMessage } from './message-manifest-entry-message';
import * as fromMessageManifestReducers from './message-manifest.reducers';
import * as fromMessageManifestActions from './message-manifest.actions';

describe('Message Manifest Reducer', () => {
  let entry1: MessageManifestEntry;
  let entry2: MessageManifestEntry;
  let entry3: MessageManifestEntry;
  let frame: any;
  let manifest: MessageManifest;
  let manifests: Array<MessageManifest>;
  let message: MessageManifestEntryMessage;
  let subscription: any;
  let update: Update<MessageManifest>;
  let updates: Array<Update<MessageManifest>>;
  let predicate: Predicate<MessageManifest>;
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
        status: fromMessageManifestReducers.ConnectionStatus.DISCONNECTED
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

    update = {
      id: JSON.stringify(fromMessageManifestReducers.adapter.selectId),
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

  it('should have manifest action type as "[Message Manifest] Add Manifest"', () => {
    const action = fromMessageManifestActions.addManifest({ manifest });
    expect(action.type === '[Message Manifest] Add Manifest')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Add Manifests"', () => {
    const action = fromMessageManifestActions.addManifests({ manifests });
    expect(action.type === '[Message Manifest] Add Manifests')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Clear Manifests"', () => {
    const action = fromMessageManifestActions.clearManifests();
    expect(action.type === '[Message Manifest] Clear Manifests')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Delete Manifest"', () => {
    const action = fromMessageManifestActions.deleteManifest({ id: manifest.name });
    expect(action.type === '[Message Manifest] Delete Manifest')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Delete Manifests"', () => {
    const action = fromMessageManifestActions.deleteManifests({ ids: [ manifest.name, manifest.name + ' 2' ] });
    expect(action.type === '[Message Manifest] Delete Manifests')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Delete Manifests By Predicate"', () => {
    const action = fromMessageManifestActions.deleteManifestsByPredicate({ predicate });
    expect(action.type === '[Message Manifest] Delete Manifests By Predicate')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Load Manifests"', () => {
    const action = fromMessageManifestActions.loadManifests({ manifests });
    expect(action.type === '[Message Manifest] Load Manifests')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Set Manifest"', () => {
    const action = fromMessageManifestActions.setManifest({ manifest });
    expect( action.type === '[Message Manifest] Set Manifest' )
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Update Manifest"', () => {
    const action = fromMessageManifestActions.updateManifest({ update });
    expect( action.type === '[Message Manifest] Update Manifest' )
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Update Manifests"', () => {
    const action = fromMessageManifestActions.updateManifests({ updates });
    expect( action.type === '[Message Manifest] Update Manifests' )
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Upsert Manifest"', () => {
    const action = fromMessageManifestActions.upsertManifest({ manifest });
    expect( action.type === '[Message Manifest] Upsert Manifest' )
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Upsert Manifests"', () => {
    const action = fromMessageManifestActions.upsertManifests({ manifests });
    expect(action.type === '[Message Manifest] Upsert Manifests')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Upsert Manifests"', () => {
    const action = fromMessageManifestActions.upsertManifests({ manifests });
    expect(action.type === '[Message Manifest] Upsert Manifests')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Submit Message"', () => {
    const action = fromMessageManifestActions.submitMessage({ message });
    expect(action.type === '[Message Manifest] Submit Message')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Submit Message Success"', () => {
    const action = fromMessageManifestActions.submitMessageSuccess({ manifest, message });
    expect(action.type === '[Message Manifest] Submit Message Success')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Submit Message Failure"', () => {
    const action = fromMessageManifestActions.submitMessageFailure({ manifest, message });
    expect(action.type === '[Message Manifest] Submit Message Failure')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Queue Message"', () => {
    const action = fromMessageManifestActions.queueMessage({ message });
    expect(action.type === '[Message Manifest] Queue Message')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Dequeue Message"', () => {
    const action = fromMessageManifestActions.dequeueMessage({ message });
    expect(action.type === '[Message Manifest] Dequeue Message')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Connect"', () => {
    const action = fromMessageManifestActions.connectManifest({ manifest });
    expect(action.type === '[Message Manifest] Connect')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Connect Success"', () => {
    const action = fromMessageManifestActions.connectManifestSuccess({ manifest });
    expect(action.type === '[Message Manifest] Connect Success')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Connect Failure"', () => {
    const action = fromMessageManifestActions.connectManifestFailure({ manifest });
    expect(action.type === '[Message Manifest] Connect Failure')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Connected"', () => {
    const action = fromMessageManifestActions.connectManifestConnected({ manifest, frame });
    expect(action.type === '[Message Manifest] Connected')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Disconnect"', () => {
    const action = fromMessageManifestActions.disconnectManifest({ manifest });
    expect(action.type === '[Message Manifest] Disconnect')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Disconnect Success"', () => {
    const action = fromMessageManifestActions.disconnectManifestSuccess({ manifest });
    expect(action.type === '[Message Manifest] Disconnect Success')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Disconnect Failure"', () => {
    const action = fromMessageManifestActions.disconnectManifestFailure({ manifest });
    expect(action.type === '[Message Manifest] Disconnect Failure')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Disconnected"', () => {
    const action = fromMessageManifestActions.disconnectManifestDisconnected({ manifest, frame });
    expect(action.type === '[Message Manifest] Disconnected')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Subscribe"', () => {
    const action = fromMessageManifestActions.subscribeManifest({ manifest, entry: entry1 });
    expect(action.type === '[Message Manifest] Subscribe')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Subscribe Success"', () => {
    const action = fromMessageManifestActions.subscribeManifestSuccess({ manifest, entry: entry1, subscription });
    expect(action.type === '[Message Manifest] Subscribe Success')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Subscribe Failure"', () => {
    const action = fromMessageManifestActions.subscribeManifestFailure({ entry: entry1 });
    expect(action.type === '[Message Manifest] Subscribe Failure')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Unsubscribe"', () => {
    const action = fromMessageManifestActions.unsubscribeManifest({ manifest, entry: entry1 });
    expect(action.type === '[Message Manifest] Unsubscribe')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Unsubscribe Success"', () => {
    const action = fromMessageManifestActions.unsubscribeManifestSuccess({ manifest, entry: entry1 });
    expect(action.type === '[Message Manifest] Unsubscribe Success')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Unsubscribe Failure"', () => {
    const action = fromMessageManifestActions.unsubscribeManifestFailure({ entry: entry1 });
    expect(action.type === '[Message Manifest] Unsubscribe Failure')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Receive Message"', () => {
    const action = fromMessageManifestActions.receiveMessage({ manifest, entry: entry1, message });
    expect(action.type === '[Message Manifest] Receive Message')
      .toBe(true);
  });

  it('should have manifest action type as "[Message Manifest] Delete Client"', () => {
    const action = fromMessageManifestActions.deleteClient({ manifest });
    expect(action.type === '[Message Manifest] Delete Client')
      .toBe(true);
  });

  // TODO entity MapManifests, Issue #294.
});
