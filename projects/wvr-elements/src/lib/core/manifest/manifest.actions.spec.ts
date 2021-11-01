import { Predicate, Update } from '@ngrx/entity';
import { Manifest } from './manifest';
import { ManifestEntry } from './manifest-entry';
import * as fromManifestReducers from './manifest.reducers';
import * as fromManifestActions from './manifest.actions';

describe('Manifest Reducer', () => {
  let entry1: ManifestEntry;
  let entry2: ManifestEntry;
  let entry3: ManifestEntry;
  let manifest: Manifest;
  let manifests: Array<Manifest>;
  let update: Update<Manifest>;
  let updates: Array<Update<Manifest>>;
  let state: any;
  let predicate: Predicate<Manifest>;

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

    predicate = (entity): boolean => {
      return entity.baseUrl === manifest.baseUrl;
    };
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

  it('should have manifest action type as "[Manifest] Delete Manifests By Predicate"', () => {
    const action = fromManifestActions.deleteManifestsByPredicate({ predicate });
    expect(action.type === '[Manifest] Delete Manifests By Predicate')
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

  // TODO entity MapManifests, Issue #294.

});
