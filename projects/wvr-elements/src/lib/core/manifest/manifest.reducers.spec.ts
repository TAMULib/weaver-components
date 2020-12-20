import { Manifest } from './manifest';
import { ManifestEntry } from './manifest-entry';
import * as fromManifestReducers from './manifest.reducers';
import * as fromManifestActions from './manifest.actions';

describe('Manifest Reducer', () => {

  // START

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

  describe('initial state', ()=> {
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
    const state =  {currentRequest: undefined,entities: {},ids: [],pendingRequests: []};
    it('should select current request', () => {
      expect(fromManifestReducers.selectCurrentRequest(state))
      .toEqual(state.currentRequest);
    });

    it('should select pending request', () => {
      expect(fromManifestReducers.selectPendingRequests(state))
      .toEqual(state.pendingRequests);
    });

  });

  describe('Manifest reducer ', () => {
    const state = { ids: [], entities: {}, pendingRequests: [{manifestName: "Directory App", entryName: "All Sorted"}], currentRequest: undefined };
    const addManifestActionObj = { manifest: { manifest,entries: [
            { description: undefined, map: data => data.payload[Object.keys(data.payload)[0]], methods: ["GET"], name: "All Sorted", options: {}, path: "/ldap/all-sorted"},
            { description: undefined, map: data => data, methods: ["GET"], name: "Departments", options: {}, path: "/ldap/departments" }],
        name: "Directory App"},
     type: "[Manifest] Add Manifest"
    };

    it("should have manifest action type as '[Manifest] Add Manifest'", () => {
      const addManifestAction = fromManifestActions.addManifest({manifest});
      expect(JSON.stringify(addManifestAction.type) === JSON.stringify('[Manifest] Add Manifest'))
      .toBe(true);
    });

    it('should add manifest', () => {
      expect(JSON.stringify(fromManifestReducers.adapter.addOne(manifest, state).entities[0]) ===
      JSON.stringify(fromManifestReducers.reducer(state, addManifestActionObj).entities[0]) )
      .toBe(true);
    });

    // setManifest
    const setManifestActionObj = {
      "manifest":{
        "name":"Directory App SetObj",
        "baseUrl":"https://api-dev.library.tamu.edu/directory-service",
        "entries":[
          {"name":"All Sorted","path":"/ldap/all-sorted","methods":["GET"]},
          {"name":"Departments","path":"/ldap/departments","methods":["GET"]}
        ]
      },
      "type":"[Manifest] Set Manifest"
    };

    it("should have manifest action type as '[Manifest] Set Manifest'", () => {
      const setManifestAction = fromManifestActions.setManifest({manifest});
      expect(JSON.stringify(setManifestAction.type) === JSON.stringify('[Manifest] Set Manifest'))
      .toBe(true);
    });

    it('should set manifest', () => {
      expect(JSON.stringify(fromManifestReducers.adapter.setOne(manifest, state).entities[0]) ===
      JSON.stringify(fromManifestReducers.reducer(state, setManifestActionObj).entities[0]) )
      .toBe(true);
    });

    //upsert Manifest
    const upsertManifestObj = {
      "manifest":{
        "name":"Directory App UpsertObj",
        "baseUrl":"https://api-dev.library.tamu.edu/directory-service",
        "entries":[
          {"name":"All Sorted","path":"/ldap/all-sorted","methods":["GET"]},
          {"name":"Departments","path":"/ldap/departments","methods":["GET"]}
        ]
      },
      "type":"[Manifest] Upsert Manifest"
    };

    it("should have manifest action type as '[Manifest] Upsert Manifest'", () => {
      const upsertManifestAction = fromManifestActions.upsertManifest({manifest});
      expect(JSON.stringify(upsertManifestAction.type) === JSON.stringify('[Manifest] Upsert Manifest'))
      .toBe(true);
    });

    it('should upsert manifest', () => {
      expect(JSON.stringify(fromManifestReducers.adapter.upsertOne(manifest, state).entities[0]) ===
      JSON.stringify(fromManifestReducers.reducer(state, upsertManifestObj).entities[0]) )
      .toBe(true);
    });

    // add many manifests
    const manifests = [manifest, manifest];
    const addManifestsObj = {
      "manifests":[
        {"name":"Directory App","baseUrl":"https://api-dev.library.tamu.edu/directory-service","entries":[{"name":"All Sorted","path":"/ldap/all-sorted","methods":["GET"]},{"name":"Departments","path":"/ldap/departments","methods":["GET"]}]},
        {"name":"Directory App","baseUrl":"https://api-dev.library.tamu.edu/directory-service","entries":[{"name":"All Sorted","path":"/ldap/all-sorted","methods":["GET"]},{"name":"Departments","path":"/ldap/departments","methods":["GET"]}]}
      ],
      "type":"[Manifest] Add Manifests"
    };

    it("should have manifest action type as '[Manifest] Add Manifests'", () => {
      const setManifestAction = fromManifestActions.addManifests({manifests});
      expect(JSON.stringify(addManifestsObj.type) === JSON.stringify('[Manifest] Add Manifests'))
      .toBe(true);
    });

    it('should add manifests', () => {
      expect(JSON.stringify(fromManifestReducers.adapter.addMany(manifests, state).entities[0]) ===
      JSON.stringify(fromManifestReducers.reducer(state, addManifestsObj).entities[0]) )
      .toBe(true);
    });

    // upsert manifests
    const upsertManifestsObj = {
      "manifests":[
        {"name":"Directory App","baseUrl":"https://api-dev.library.tamu.edu/directory-service","entries":[{"name":"All Sorted","path":"/ldap/all-sorted","methods":["GET"]},{"name":"Departments","path":"/ldap/departments","methods":["GET"]}]},
        {"name":"Directory App","baseUrl":"https://api-dev.library.tamu.edu/directory-service","entries":[{"name":"All Sorted","path":"/ldap/all-sorted","methods":["GET"]},{"name":"Departments","path":"/ldap/departments","methods":["GET"]}]}
      ],
      "type":"[Manifest] Upsert Manifests"
    };
    it("should have manifest action type as '[Manifest] Upsert Manifests'", () => {
      const upsertManifestsAction = fromManifestActions.upsertManifests({manifests});
      expect(JSON.stringify(upsertManifestsAction.type) === JSON.stringify('[Manifest] Upsert Manifests'))
      .toBe(true);
    });

    it('should add manifests', () => {
      expect(JSON.stringify(fromManifestReducers.adapter.upsertMany(manifests, state).entities[0]) ===
      JSON.stringify(fromManifestReducers.reducer(state, upsertManifestsObj).entities[0]) )
      .toBe(true);
    });

    // update manifest


  });

  // END
});
