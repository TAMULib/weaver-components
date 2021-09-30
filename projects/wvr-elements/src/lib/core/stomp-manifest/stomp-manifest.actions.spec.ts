import { Predicate, Update } from '@ngrx/entity';
import { StompManifest } from './stomp-manifest';
import { StompManifestEntry } from './stomp-manifest-entry';
import { StompManifestEntryMessage } from './stomp-manifest-entry-message';
import * as fromStompManifestReducers from './stomp-manifest.reducers';
import * as fromStompManifestActions from './stomp-manifest.actions';

describe('Stomp Manifest Reducer', () => {
  let entry1: StompManifestEntry;
  let entry2: StompManifestEntry;
  let entry3: StompManifestEntry;
  let frame: any;
  let manifest: StompManifest;
  let manifests: Array<StompManifest>;
  let message: StompManifestEntryMessage;
  let subscription: any;
  let update: Update<StompManifest>;
  let updates: Array<Update<StompManifest>>;
  let predicate: Predicate<StompManifest>;
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
        status: fromStompManifestReducers.ConnectionStatus.DISCONNECTED
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
      id: JSON.stringify(fromStompManifestReducers.adapter.selectId),
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

  it('should have manifest action type as "[Stomp Manifest] Add Manifest"', () => {
    const action = fromStompManifestActions.addManifest({ manifest });
    expect(action.type === '[Stomp Manifest] Add Manifest')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Add Manifests"', () => {
    const action = fromStompManifestActions.addManifests({ manifests });
    expect(action.type === '[Stomp Manifest] Add Manifests')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Clear Manifests"', () => {
    const action = fromStompManifestActions.clearManifests();
    expect(action.type === '[Stomp Manifest] Clear Manifests')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Delete Manifest"', () => {
    const action = fromStompManifestActions.deleteManifest({ id: manifest.name });
    expect(action.type === '[Stomp Manifest] Delete Manifest')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Delete Manifests"', () => {
    const action = fromStompManifestActions.deleteManifests({ ids: [ manifest.name, manifest.name + ' 2' ] });
    expect(action.type === '[Stomp Manifest] Delete Manifests')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Delete Manifests By Predicate"', () => {
    const action = fromStompManifestActions.deleteManifestsByPredicate({ predicate });
    expect(action.type === '[Stomp Manifest] Delete Manifests By Predicate')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Load Manifests"', () => {
    const action = fromStompManifestActions.loadManifests({ manifests });
    expect(action.type === '[Stomp Manifest] Load Manifests')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Set Manifest"', () => {
    const action = fromStompManifestActions.setManifest({ manifest });
    expect( action.type === '[Stomp Manifest] Set Manifest' )
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Update Manifest"', () => {
    const action = fromStompManifestActions.updateManifest({ update });
    expect( action.type === '[Stomp Manifest] Update Manifest' )
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Update Manifests"', () => {
    const action = fromStompManifestActions.updateManifests({ updates });
    expect( action.type === '[Stomp Manifest] Update Manifests' )
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Upsert Manifest"', () => {
    const action = fromStompManifestActions.upsertManifest({ manifest });
    expect( action.type === '[Stomp Manifest] Upsert Manifest' )
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Upsert Manifests"', () => {
    const action = fromStompManifestActions.upsertManifests({ manifests });
    expect(action.type === '[Stomp Manifest] Upsert Manifests')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Upsert Manifests"', () => {
    const action = fromStompManifestActions.upsertManifests({ manifests });
    expect(action.type === '[Stomp Manifest] Upsert Manifests')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Submit Message"', () => {
    const action = fromStompManifestActions.submitMessage({ message });
    expect(action.type === '[Stomp Manifest] Submit Message')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Submit Message Success"', () => {
    const action = fromStompManifestActions.submitMessageSuccess({ manifest, message });
    expect(action.type === '[Stomp Manifest] Submit Message Success')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Submit Message Failure"', () => {
    const action = fromStompManifestActions.submitMessageFailure({ manifest, message });
    expect(action.type === '[Stomp Manifest] Submit Message Failure')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Queue Message"', () => {
    const action = fromStompManifestActions.queueMessage({ message });
    expect(action.type === '[Stomp Manifest] Queue Message')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Dequeue Message"', () => {
    const action = fromStompManifestActions.dequeueMessage({ message });
    expect(action.type === '[Stomp Manifest] Dequeue Message')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Connect"', () => {
    const action = fromStompManifestActions.connectManifest({ manifest });
    expect(action.type === '[Stomp Manifest] Connect')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Connect Success"', () => {
    const action = fromStompManifestActions.connectManifestSuccess({ manifest });
    expect(action.type === '[Stomp Manifest] Connect Success')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Connect Failure"', () => {
    const action = fromStompManifestActions.connectManifestFailure({ manifest });
    expect(action.type === '[Stomp Manifest] Connect Failure')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Connected"', () => {
    const action = fromStompManifestActions.connectManifestConnected({ manifest, frame });
    expect(action.type === '[Stomp Manifest] Connected')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Disconnect"', () => {
    const action = fromStompManifestActions.disconnectManifest({ manifest });
    expect(action.type === '[Stomp Manifest] Disconnect')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Disconnect Success"', () => {
    const action = fromStompManifestActions.disconnectManifestSuccess({ manifest });
    expect(action.type === '[Stomp Manifest] Disconnect Success')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Disconnect Failure"', () => {
    const action = fromStompManifestActions.disconnectManifestFailure({ manifest });
    expect(action.type === '[Stomp Manifest] Disconnect Failure')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Disconnected"', () => {
    const action = fromStompManifestActions.disconnectManifestDisconnected({ manifest, frame });
    expect(action.type === '[Stomp Manifest] Disconnected')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Subscribe"', () => {
    const action = fromStompManifestActions.subscribeManifest({ manifest, entry: entry1 });
    expect(action.type === '[Stomp Manifest] Subscribe')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Subscribe Success"', () => {
    const action = fromStompManifestActions.subscribeManifestSuccess({ manifest, entry: entry1, subscription });
    expect(action.type === '[Stomp Manifest] Subscribe Success')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Subscribe Failure"', () => {
    const action = fromStompManifestActions.subscribeManifestFailure({ entry: entry1 });
    expect(action.type === '[Stomp Manifest] Subscribe Failure')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Unsubscribe"', () => {
    const action = fromStompManifestActions.unsubscribeManifest({ manifest, entry: entry1 });
    expect(action.type === '[Stomp Manifest] Unsubscribe')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Unsubscribe Success"', () => {
    const action = fromStompManifestActions.unsubscribeManifestSuccess({ manifest, entry: entry1 });
    expect(action.type === '[Stomp Manifest] Unsubscribe Success')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Unsubscribe Failure"', () => {
    const action = fromStompManifestActions.unsubscribeManifestFailure({ entry: entry1 });
    expect(action.type === '[Stomp Manifest] Unsubscribe Failure')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Receive Message"', () => {
    const action = fromStompManifestActions.receiveMessage({ manifest, entry: entry1, message });
    expect(action.type === '[Stomp Manifest] Receive Message')
      .toBe(true);
  });

  it('should have manifest action type as "[Stomp Manifest] Delete Client"', () => {
    const action = fromStompManifestActions.deleteClient({ manifest });
    expect(action.type === '[Stomp Manifest] Delete Client')
      .toBe(true);
  });

  // TODO entity MapManifests, Issue #294.
});
