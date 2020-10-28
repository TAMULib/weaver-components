import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Manifest } from './manifest';
import { ManifestEntryRequest } from './manifest-entry-request';
import * as ManifestActions from './manifest.actions';

export interface State extends EntityState<Manifest> {
  pendingRequests: Array<ManifestEntryRequest>;
  currentRequest: ManifestEntryRequest;
}

// tslint:disable-next-line:only-arrow-functions
export function selectManifestByName(manifest: Manifest): string {
  return manifest.name;
}

export const adapter: EntityAdapter<Manifest> = createEntityAdapter<Manifest>({
  selectId: selectManifestByName
});

export const initialState: State = adapter.getInitialState({
  pendingRequests: [],
  currentRequest: undefined
});

const manifestReducer = createReducer(
  initialState,
  on(ManifestActions.addManifest, (state, { manifest }) => adapter.addOne(manifest, state)),
  on(ManifestActions.setManifest, (state, { manifest }) => adapter.setOne(manifest, state)),
  on(ManifestActions.upsertManifest, (state, { manifest }) => adapter.upsertOne(manifest, state)),
  on(ManifestActions.addManifests, (state, { manifests }) => adapter.addMany(manifests, state)),
  on(ManifestActions.upsertManifests, (state, { manifests }) => adapter.upsertMany(manifests, state)),
  on(ManifestActions.updateManifest, (state, { update }) => adapter.updateOne(update, state)),
  on(ManifestActions.updateManifests, (state, { updates }) => adapter.updateMany(updates, state)),
  on(ManifestActions.mapManifest, (state, { entityMap }) => adapter.mapOne(entityMap, state)),
  on(ManifestActions.mapManifests, (state, { entityMap }) => adapter.map(entityMap, state)),
  on(ManifestActions.deleteManifest, (state, { id }) => adapter.removeOne(id, state)),
  on(ManifestActions.deleteManifests, (state, { ids }) => adapter.removeMany(ids, state)),
  on(ManifestActions.deleteManifestsByPredicate, (state, { predicate }) => adapter.removeMany(predicate, state)),
  on(ManifestActions.loadManifests, (state, { manifests }) => adapter.setAll(manifests, state)),
  on(ManifestActions.clearManifests, state => adapter.removeAll({ ...state, selectedManifestId: undefined })),
  // tslint:disable-next-line:arrow-return-shorthand
  on(ManifestActions.submitRequest, (state, { request }) => {
    return {
      ...state,
      currentRequest: request
    // tslint:disable-next-line:semicolon
    }
  }),
  // tslint:disable-next-line:arrow-return-shorthand
  on(ManifestActions.submitRequestSuccess, (state, { request, response, manifest }) => {
    return adapter.updateOne({
      id: manifest.name,
      changes: {
        entries: manifest.entries.map(entry => {
          if (entry.name === request.entryName) {
            return { ...entry, request, response };
          }

          // tslint:disable-next-line:arrow-return-shorthand
          return entry;
        })
      }
    }, {
      ...state,
      currentRequest: undefined
    });
  }),
  // tslint:disable-next-line:arrow-return-shorthand
  on(ManifestActions.submitRequestFailure, (state, { request, error, manifest }) => {
    return adapter.updateOne({
      id: manifest.name,
      changes: {
        entries: manifest.entries.map(entry => {
          if (entry.name === request.entryName) {
            return { ...entry, request, error };
          }

          return entry;
        })
      }
    }, {
      ...state,
      currentRequest: undefined
    });
  }),
  // tslint:disable-next-line:arrow-return-shorthand
  on(ManifestActions.queueRequest, (state, { request }) => {
    return {
      ...state,
      pendingRequests: state.pendingRequests.concat([{ ...request }]),
      currentRequest: undefined
    };
  }),
  // tslint:disable-next-line:arrow-return-shorthand
  on(ManifestActions.dequeueRequest, (state, { request }) => {
    return {
      ...state,
      pendingRequests: state.pendingRequests.filter(r => r.manifestName !== request.manifestName && r.entryName !== request.entryName)
    };
  })
);

// tslint:disable-next-line:typedef
export function reducer(state: State | undefined, action: Action) {
  return manifestReducer(state, action);
}

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

// select the array of manifest names
export const selectManifestNames = selectIds;

// select the dictionary of manifest entities
export const selectManifestEntities = selectEntities;

// select the array of manifests
export const selectAllManifests = selectAll;

// select the total manifest count
export const selectManifestTotal = selectTotal;

export const selectCurrentRequest = (state: State) => state.currentRequest;

export const selectPendingRequests = (state: State) => state.pendingRequests;
