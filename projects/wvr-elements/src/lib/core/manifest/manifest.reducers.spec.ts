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
    const manifest: Manifest = {
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
  });
});
