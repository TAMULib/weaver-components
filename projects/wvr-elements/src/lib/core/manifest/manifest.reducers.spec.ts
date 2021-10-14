import { EntityMapOne, Update } from '@ngrx/entity';
import { Manifest } from './manifest';
import { ManifestEntry } from './manifest-entry';
import * as fromManifestReducers from './manifest.reducers';
import * as fromManifestActions from './manifest.actions';
import { ManifestEntryRequest } from './manifest-entry-request';

describe('Manifest Reducer', () => {
  let entry1: ManifestEntry;
  let entry2: ManifestEntry;
  let entry3: ManifestEntry;
  let manifest: Manifest;
  let manifests: Array<Manifest>;
  let update: Update<Manifest>;
  let updates: Array<Update<Manifest>>;
  let state: any;
  let actionObjectManifest: any;
  let request: ManifestEntryRequest;

  beforeEach(() => {
    entry1 = {
      name: 'All Sorted',
      path: '/ldap/all-sorted',
      methods: [ 'GET' ]
    };

    entry2 = {
      name: 'Departments',
      path: '/ldap/departments',
      methods: [ 'GET' ]
    };

    entry3 = {
      name: 'Other',
      path: '/other',
      methods: [ 'GET' ]
    };

    manifest = {
      name: 'Directory App',
      baseUrl: 'https://api-dev.library.tamu.edu/directory-service',
      entries: [ entry1, entry2 ]
    };

    manifests = [
      manifest, {
        ...manifest,
        name: manifest.name + ' 2',
        entries: [ entry3 ]
      }
    ];

    state = {
      ids: [],
      entities: {},
      pendingRequests: [],
      currentRequest: undefined
    };

    actionObjectManifest = {
      name: manifest.name,
      baseUrl: manifest.baseUrl,
      entries: [
        { description: undefined, map: data =>
          data.payload[Object.keys(data.payload)[0]], methods: entry1.methods, name: entry1.name, options: {}, path: entry1.path },
        { description: undefined, map: data => data, methods: entry2.methods, name: entry2.name, options: {}, path: entry2.path }
      ]
    };

    update = {
      id: JSON.stringify(fromManifestReducers.adapter.selectId),
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

    request = {
      manifestName: manifest.name,
      entryName: entry1.name
    };
  });

  describe('initial state', () => {
    it('should return the initial state', () => {
      const { initialState } = fromManifestReducers;
      const action = {} as any;

      expect(fromManifestReducers.reducer(undefined, action))
        .toBe(initialState);
    });

    it('should select manifest by name', () => {
      expect(fromManifestReducers.selectManifestByName(manifest))
        .toEqual(manifest.name);
    });

    it('should select current request', () => {
      expect(fromManifestReducers.selectCurrentRequest(state))
        .toEqual(state.currentRequest);
    });

    it('should select pending request', () => {
      expect(fromManifestReducers.selectPendingRequests(state))
        .toEqual(state.pendingRequests);
    });
  });

  it('should have manifest action type as "[Manifest] Add Manifest"', () => {
    const action = fromManifestActions.addManifest({ manifest });
    expect(action.type === '[Manifest] Add Manifest')
      .toBe(true);
  });

  it('should have manifest action type as "[Manifest] Add Manifests"', () => {
    const action = fromManifestActions.addManifests({ manifests });
    expect(action.type === '[Manifest] Add Manifests')
      .toBe(true);
  });

  it('should have manifest action type as "[Manifest] Clear Manifests"', () => {
    const action = fromManifestActions.clearManifests();
    expect(action.type === '[Manifest] Clear Manifests')
      .toBe(true);
  });

  it('should have manifest action type as "[Manifest] Delete Manifest"', () => {
    const action = fromManifestActions.deleteManifest({ id: manifest.name });
    expect(action.type === '[Manifest] Delete Manifest')
      .toBe(true);
  });

  it('should have manifest action type as "[Manifest] Delete Manifests"', () => {
    const action = fromManifestActions.deleteManifests({ ids: [ manifest.name, manifest.name + ' 2' ] });
    expect(action.type === '[Manifest] Delete Manifests')
      .toBe(true);
  });

  it('should have manifest action type as "[Manifest] Load Manifests"', () => {
    const action = fromManifestActions.loadManifests({ manifests });
    expect(action.type === '[Manifest] Load Manifests')
      .toBe(true);
  });

  it('should have manifest action type as "[Manifest] Set Manifest"', () => {
    const action = fromManifestActions.setManifest({ manifest });
    expect( action.type === '[Manifest] Set Manifest' )
      .toBe(true);
  });

  it('should have manifest action type as "[Manifest] Update Manifest"', () => {
    const action = fromManifestActions.updateManifest({ update });
    expect( action.type === '[Manifest] Update Manifest' )
      .toBe(true);
  });

  it('should have manifest action type as "[Manifest] Update Manifests"', () => {
    const action = fromManifestActions.updateManifests({ updates });
    expect( action.type === '[Manifest] Update Manifests' )
      .toBe(true);
  });

  it('should have manifest action type as "[Manifest] Upsert Manifest"', () => {
    const action = fromManifestActions.upsertManifest({ manifest });
    expect( action.type === '[Manifest] Upsert Manifest' )
      .toBe(true);
  });

  it('should have manifest action type as "[Manifest] Upsert Manifests"', () => {
    const action = fromManifestActions.upsertManifests({ manifests });
    expect(action.type === '[Manifest] Upsert Manifests')
      .toBe(true);
  });

  it('should add manifest', () => {
    const expected = fromManifestReducers.adapter.addOne(manifest, state);
    const action = fromManifestActions.addManifest({ manifest });
    const reduced = fromManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should add manifest', () => {
    const expected = fromManifestReducers.adapter.addOne(manifest, state);
    const action = fromManifestActions.addManifest({ manifest });
    const reduced = fromManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should add many manifests', () => {
    const expected = fromManifestReducers.adapter.addMany(manifests, state);
    const action = fromManifestActions.addManifests({ manifests });
    const reduced = fromManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should clear all manifests', () => {
    const expected = fromManifestReducers.adapter.removeAll(state);
    const action = fromManifestActions.clearManifests();
    const reduced = fromManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should delete manifest', () => {
    const expected = fromManifestReducers.adapter.removeOne(manifest.name, state);
    const action = fromManifestActions.deleteManifest({ id: manifest.name });
    const reduced = fromManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should delete many manifests', () => {
    const ids = [ manifest.name, manifest.name + ' 2' ];
    const expected = fromManifestReducers.adapter.removeMany(ids, state);
    const action = fromManifestActions.deleteManifests({ ids } );
    const reduced = fromManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should load many manifests', () => {
    const expected = fromManifestReducers.adapter.setAll(manifests, state);
    const action = fromManifestActions.loadManifests({ manifests });
    const reduced = fromManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should set manifest', () => {
    const expected = fromManifestReducers.adapter.setOne(manifest, state);
    const action = fromManifestActions.setManifest({ manifest });
    const reduced = fromManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should update manifest', () => {
    const expected = fromManifestReducers.adapter.updateOne(update, state);
    const action = fromManifestActions.updateManifest({ update });
    const reduced = fromManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should update many manifests', () => {
    const expected = fromManifestReducers.adapter.updateMany(updates, state);
    const action = fromManifestActions.updateManifests({ updates });
    const reduced = fromManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should upsert manifest', () => {
    const expected = fromManifestReducers.adapter.upsertOne(manifest, state);
    const action = fromManifestActions.upsertManifest({ manifest });
    const reduced = fromManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should upsert many manifests', () => {
    const expected = fromManifestReducers.adapter.upsertMany(manifests, state);
    const action = fromManifestActions.upsertManifests({ manifests });
    const reduced = fromManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should submit manifest request', () => {
    const action = fromManifestActions.submitRequest({ request });
    const reduced = fromManifestReducers.reducer(state, action);

    expect(JSON.stringify(action.request) === JSON.stringify(reduced.currentRequest))
      .toBe(true);
  });

  it('should submit manifest request failure', () => {
    state.entities[manifest.name] = manifest;

    const response = {};

    update.id = manifest.name;
    update.changes = {
      entries: manifest.entries.map(e => e.name === request.entryName ? { ...e, request, response } : e)
    };

    const expected = fromManifestReducers.adapter.updateOne(update, state);
    const action = fromManifestActions.submitRequestFailure({ manifest, request, response });
    const reduced = fromManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should submit manifest request failure with an unmatched entry name', () => {
    state.entities[manifest.name] = manifest;
    request.entryName = "Does Not Exist";

    const response = {};

    update.id = manifest.name;
    update.changes = {
      entries: manifest.entries.map(e => e.name === request.entryName ? { ...e, request, response } : e)
    };

    const expected = fromManifestReducers.adapter.updateOne(update, state);
    const action = fromManifestActions.submitRequestFailure({ manifest, request, response });
    const reduced = fromManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should submit manifest request success', () => {
    state.entities[manifest.name] = manifest;

    const response = {};

    update.id = manifest.name;
    update.changes = {
      entries: manifest.entries.map(e => e.name === request.entryName ? { ...e, request, response } : e)
    };

    const expected = fromManifestReducers.adapter.updateOne(update, state);
    const action = fromManifestActions.submitRequestSuccess({ manifest, request, response });
    const reduced = fromManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should submit manifest request success with an unmatched entry name', () => {
    state.entities[manifest.name] = manifest;
    request.entryName = "Does Not Exist";

    const response = {};

    update.id = manifest.name;
    update.changes = {
      entries: manifest.entries.map(e => e.name === request.entryName ? { ...e, request, response } : e)
    };

    const expected = fromManifestReducers.adapter.updateOne(update, state);
    const action = fromManifestActions.submitRequestSuccess({ manifest, request, response });
    const reduced = fromManifestReducers.reducer(state, action);

    expect(JSON.stringify(expected) === JSON.stringify(reduced))
      .toBe(true);
  });

  it('should queue a request', () => {
    const action = fromManifestActions.queueRequest({ request });
    const reduced = fromManifestReducers.reducer(state, action);

    expect(JSON.stringify(request) === JSON.stringify(reduced.pendingRequests[reduced.pendingRequests.length - 1]))
      .toBe(true);
  });

  it('should queue a request with multiple requests', () => {
    state.pendingRequests.push({ ...request, manifestName: manifest.name + ' 2', entryName: entry3.name });
    state.pendingRequests.push({ ...request, entryName: entry2.name });

    const action = fromManifestActions.queueRequest({ request });
    const reduced = fromManifestReducers.reducer(state, action);

    expect(JSON.stringify(request) === JSON.stringify(reduced.pendingRequests[reduced.pendingRequests.length - 1]))
      .toBe(true);

    expect(reduced.pendingRequests.length === 3)
      .toBe(true);
  });

  it('should dequeue a request', () => {
    state.pendingRequests.push(request);

    const action = fromManifestActions.dequeueRequest({ request });
    const reduced = fromManifestReducers.reducer(state, action);

    expect(reduced.pendingRequests.length === 0)
      .toBe(true);
  });

  it('should dequeue a request with multiple requests', () => {
    state.pendingRequests.push({ ...request, manifestName: manifest.name + ' 2', entryName: entry3.name });
    state.pendingRequests.push({ ...request, manifestName: manifest.name, entryName: entry2.name });
    state.pendingRequests.push(request);

    const action = fromManifestActions.dequeueRequest({ request });
    const reduced = fromManifestReducers.reducer(state, action);

    expect(reduced.pendingRequests.length === 2)
      .toBe(true);
  });

  // TODO entity MapManifests, delete manifests by predicate, Issue #294.

});
