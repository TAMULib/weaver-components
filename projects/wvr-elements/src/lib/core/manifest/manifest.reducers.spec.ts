import { EntityMapOne, Update } from '@ngrx/entity';
import { Manifest } from './manifest';
import { ManifestEntry } from './manifest-entry';
import * as fromManifestReducers from './manifest.reducers';
import * as fromManifestActions from './manifest.actions';
import { ManifestEntryRequest } from './manifest-entry-request';

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

    it('should upsert manifests', () => {
      expect(JSON.stringify(fromManifestReducers.adapter.upsertMany(manifests, state).entities[0]) ===
      JSON.stringify(fromManifestReducers.reducer(state, upsertManifestsObj).entities[0]) )
      .toBe(true);
    });

    const update: Update<Manifest> = {
      id: JSON.stringify( fromManifestReducers.adapter.selectId ),
      changes: {name: JSON.stringify( fromManifestReducers.selectManifestByName(manifest))}
    };

    // update one manifest
    const updateOneAdpater = fromManifestReducers.adapter.updateOne(
      {id: JSON.stringify( fromManifestReducers.adapter.selectId ),changes: {name: manifest.name}}, state);

    it('should update one manifest', () => {
      const updateOneAction = fromManifestActions.updateManifest( {update} );
      const updateOneReducer = fromManifestReducers.reducer(state, updateOneAction);
      expect(JSON.stringify(updateOneAdpater.entities[0]) === JSON.stringify(updateOneReducer.entities[0]) )
      .toBe(true);
    });

    // update many manifests
    it('should update many manifests', () => {
      const updates = [update, update ];
      const updateManifestsAction = fromManifestActions.updateManifests({ updates });
      const updateManifestsAdapter = fromManifestReducers.adapter.updateMany(updates, state);
      const updateManyReducer = fromManifestReducers.reducer(state, updateManifestsAction);
      expect(JSON.stringify(updateManifestsAdapter.entities[0]) === JSON.stringify(updateManyReducer.entities[0]) )
      .toBe(true);
    });

    // entity MapOne
    it('should map one manifest', () => {
      const entityMap: EntityMapOne<Manifest> = {
        id: fromManifestReducers.selectManifestByName(manifest),
        map: undefined
      };
      const mapOneAction = fromManifestActions.mapManifest({ entityMap});
      const mapOneadpater = fromManifestReducers.adapter.mapOne(entityMap, state);
      const mapOneReducer = fromManifestReducers.reducer(state, mapOneAction);
      expect(JSON.stringify(mapOneadpater.entities[0]) === JSON.stringify(mapOneReducer.entities[0]) )
      .toBe(true);
    });

    // TODO entity MapManifests

    // deleteManifest
    it('should be able to remove manifest', () => {
      const id = manifest.name;
      const deleteManifestAction = fromManifestActions.deleteManifest({id: id });
      const deleteManifestAdapter = fromManifestReducers.adapter.removeOne(id, state) ;
      const deleteManifestReducer = fromManifestReducers.reducer(state, deleteManifestAction);
      expect(JSON.stringify(deleteManifestAdapter) === JSON.stringify(deleteManifestReducer) )
      .toBe(true);
    });

    const anotherManifest: Manifest = {
      name: "Subject App",
      baseUrl: "https://api-dev.library.tamu.edu/directory-service",
      entries: [manifestEntry1, manifestEntry2]
    };

    // delete manifests
    it('should be able to remove manifests', () => {
      const ids = [manifest.name, anotherManifest.name];
      const deleteManifestsAction = fromManifestActions.deleteManifests({ids: ids });
      const deleteManifestsAdapter = fromManifestReducers.adapter.removeMany(ids, state) ;
      const deleteManifestsReducer = fromManifestReducers.reducer(state, deleteManifestsAction);
      expect(JSON.stringify(deleteManifestsAdapter) === JSON.stringify(deleteManifestsReducer) )
      .toBe(true);
    });

    // TODO delete manifests by predicate

    // load manifests
    it('should be able to load manifests', () => {
      const manifests = [manifest, anotherManifest];
      const loadManifestsAction = fromManifestActions.loadManifests( {manifests});
      const loadManifestsAdapter = fromManifestReducers.adapter.setAll(manifests, state) ;
      const loadManifestsReducer = fromManifestReducers.reducer(state, loadManifestsAction);
      expect(JSON.stringify(loadManifestsAdapter) === JSON.stringify(loadManifestsReducer) )
      .toBe(true);
    });

    // clear manifests
    it('should be able to clear manifests', () => {
      const clearManifestsAction = fromManifestActions.clearManifests();
      const clearManifestsAdapter = fromManifestReducers.adapter.removeAll(state) ;
      const clearManifestsReducer = fromManifestReducers.reducer(state, clearManifestsAction);
      expect(JSON.stringify(clearManifestsAdapter) === JSON.stringify(clearManifestsReducer))
      .toBe(true);
    });

    // submit request
    it('should be able to submit request', () => {
      const request: ManifestEntryRequest = {
        manifestName: "Directory App",
        entryName: "All Sorted Submit Request"
      };
      const submitRequestAction = fromManifestActions.submitRequest({request});
      const submitRequestReducer = fromManifestReducers.reducer(state,submitRequestAction);
      expect(JSON.stringify(submitRequestAction.request)===JSON.stringify(submitRequestReducer.currentRequest))
      .toBe(true);
    });

    // submit request success
    let request: ManifestEntryRequest = {
      manifestName: "Directory App",
      entryName: "All Sorted Submit Request"
    };

    it('should be able to submit request success', () => {
      const response = {};
      let submitRequestAction = fromManifestActions.submitRequestSuccess({manifest, request, response});
      let submitRequestReducer = fromManifestReducers.reducer(state,submitRequestAction);
      expect(JSON.stringify(updateOneAdpater)===JSON.stringify(submitRequestReducer))
      .toBe(true);

      // to check the reducer response when request entry name equals manifest entry name
      request = {
        manifestName: "Directory App",
        entryName: "All Sorted"
      };
      submitRequestAction = fromManifestActions.submitRequestSuccess({manifest, request, response});
      submitRequestReducer = fromManifestReducers.reducer(state,submitRequestAction);
      expect(JSON.stringify(updateOneAdpater)===JSON.stringify(submitRequestReducer))
      .toBe(true);
    });

    // submit request failure
    it('should have submit request failure', () => {
      const error = {};
      let submitRequestAction = fromManifestActions.submitRequestFailure({manifest, request, error});
      let submitRequestReducer = fromManifestReducers.reducer(state,submitRequestAction);
      expect(JSON.stringify(updateOneAdpater)===JSON.stringify(submitRequestReducer))
      .toBe(true);
      request = {
        manifestName: "Directory App",
        entryName: "All Sorted"
      };
      submitRequestAction = fromManifestActions.submitRequestFailure({manifest, request, error});
      submitRequestReducer = fromManifestReducers.reducer(state,submitRequestAction);
      expect(JSON.stringify(updateOneAdpater)===JSON.stringify(submitRequestReducer))
      .toBe(true);
    });

    // queue request
    it('should be able to queue a request', () => {
      const request: ManifestEntryRequest = {
        manifestName: "Directory App",
        entryName: "All Sorted Queued Request"
      };
      const queueRequestAction = fromManifestActions.queueRequest({request});
      const queueRequestReducer = fromManifestReducers.reducer(state, queueRequestAction);
      expect(JSON.stringify(queueRequestReducer.pendingRequests[queueRequestReducer.pendingRequests.length -1]) === JSON.stringify(request))
        .toBe(true);
    });

    // dequeue request
    it('should be able to dequeue a request', () => {
      const queueRequestAction = fromManifestActions.dequeueRequest({request});
      const queueRequestReducer = fromManifestReducers.reducer(state, queueRequestAction);
      expect( queueRequestReducer.pendingRequests.length  === 0 )
        .toBe(true);
    });

  });

  // END
});
