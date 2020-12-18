import { Manifest } from './manifest';
import { ManifestEntry } from './manifest-entry';
import * as fromManifestReducers from './manifest.reducers';
import * as fromManifestActions from './manifest.actions';

describe('ManifestReducer', () => {
  // initial state
  describe('initial state', () => {
    it('should return the initial state', () => {
      const { initialState } = fromManifestReducers;
      const action = {} as any;
      expect(fromManifestReducers.reducer(undefined, action))
      .toBe(initialState);
    });

  });

  describe('selectManifestByName', () => {
    const manifestEntry1: ManifestEntry = {
      name: "All Sorted",
      path: "/ldap/all-sorted",
      methods: ["GET"]
    };
    const manifestEntry2: ManifestEntry = {
      name: "Departments",
      path: "/ldap/departments",
      methods: ["GET"]
    };

    const state =  {currentRequest: undefined,entities: {},ids: [],pendingRequests: []};
    const manifest: Manifest = {
      name: "Directory App",
      baseUrl: "https://api-dev.library.tamu.edu/directory-service",
      entries: [manifestEntry1, manifestEntry2]
    };

    // select manifest by name
    it('should select manifest by name', () => {
      expect(fromManifestReducers.selectManifestByName(manifest))
      .toEqual(manifest.name);
    });

  });

  describe('manifest reducers', () => {
    const state =  {currentRequest: undefined,entities: {},ids: [],pendingRequests: []};
    const action = { request: {manifestName: "Directory App", entryName: "All Sorted"}, type: "[Manifest] Submit Request" };
    const manifestReducer  = {ids: [],entities: {},pendingRequests: [], currentRequest: {entryName: "All Sorted", manifestName: "Directory App"}};

    it('manifest submit request', () => {
      expect(fromManifestReducers.reducer(state, action))
      .toEqual(manifestReducer);
    });

    it('manifest reducer gets current request', () => {
      expect(fromManifestReducers.selectCurrentRequest(state))
      .toEqual(state.currentRequest);
    });

    it('manifest reducer gets pending request', () => {
      expect(fromManifestReducers.selectPendingRequests(state))
      .toEqual(state.pendingRequests);
    });
  });

  describe('manifest actions', () => {
    const manifestEntry1: ManifestEntry = {
      name: "All Sorted",
      path: "/ldap/all-sorted",
      methods: ["GET"]
    };
    const manifestEntry2: ManifestEntry = {
      name: "Departments",
      path: "/ldap/departments",
      methods: ["GET"]
    };
    let manifest: Manifest = {
      name: "Directory App",
      baseUrl: "https://api-dev.library.tamu.edu/directory-service",
      entries: [manifestEntry1, manifestEntry2]
    };

    const state = { ids: [], entities: {}, pendingRequests: [{manifestName: "Directory App", entryName: "All Sorted"}], currentRequest: undefined };
    const action = { manifest: { manifest,entries: [
            { description: undefined, map: data => data.payload[Object.keys(data.payload)[0]], methods: ["GET"], name: "All Sorted", options: {}, path: "/ldap/all-sorted"},
            { description: undefined, map: data => data, methods: ["GET"], name: "Departments", options: {}, path: "/ldap/departments" }],
        name: "Directory App"},
     type: "[Manifest] Add Manifest"
    };

    it('add manifest action', () => {
      const addManifestAction = fromManifestActions.addManifest({manifest});
      Object.keys(addManifestAction).forEach(key => {
        Object.keys(action).forEach(actionKey => {
          if(key === actionKey && key === 'type') {
            expect(addManifestAction[key])
            .toEqual(action[key]);
          }
        });
      });
    });

    const adapter = {
      selectId: fromManifestReducers.selectManifestByName(manifest)
    };

    // adapter addOne method
    it('should have successfully add manifest', () => {
      expect(JSON.stringify(fromManifestReducers.adapter.addOne(manifest, state).entities[0]) ===
      JSON.stringify(fromManifestReducers.reducer(state, action).entities[0]) )
      .toBe(true);
    });

    // adapter setOne method
    manifest.name = "New name";
    const tempObj = fromManifestReducers.adapter.setOne(manifest, state).entities[manifest.name];

    it('should have successfully set one manifest', () => {
      expect(Object.values(tempObj).includes(manifest.name))
      .toBe(true);
    });

    // it('should have the correct primary id of the manifest', () => {
    //   expect(adapter.selectId)
    //     .toEqual(manifest.name);
    // });

  });
});

