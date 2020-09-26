import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Manifest } from './manifest';
import { ManifestEntryRequest } from './manifest-entry-request';
import * as ManifestActions from './manifest.actions';

export interface State extends EntityState<Manifest> {
  pendingRequests: Array<ManifestEntryRequest>;
  processingRequest: ManifestEntryRequest;
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
  processingRequest: undefined
});

const manifestReducer = createReducer(
  initialState,
  on(ManifestActions.addManifest, (state, { manifest }) => {
    return adapter.addOne(manifest, state)
  }),
  on(ManifestActions.setManifest, (state, { manifest }) => {
    return adapter.setOne(manifest, state)
  }),
  on(ManifestActions.upsertManifest, (state, { manifest }) => {
    return adapter.upsertOne(manifest, state);
  }),
  on(ManifestActions.addManifests, (state, { manifests }) => {
    return adapter.addMany(manifests, state);
  }),
  on(ManifestActions.upsertManifests, (state, { manifests }) => {
    return adapter.upsertMany(manifests, state);
  }),
  on(ManifestActions.updateManifest, (state, { update }) => {
    return adapter.updateOne(update, state);
  }),
  on(ManifestActions.updateManifests, (state, { updates }) => {
    return adapter.updateMany(updates, state);
  }),
  on(ManifestActions.mapManifest, (state, { entityMap }) => {
    return adapter.mapOne(entityMap, state);
  }),
  on(ManifestActions.mapManifests, (state, { entityMap }) => {
    return adapter.map(entityMap, state);
  }),
  on(ManifestActions.deleteManifest, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(ManifestActions.deleteManifests, (state, { ids }) => {
    return adapter.removeMany(ids, state);
  }),
  on(ManifestActions.deleteManifestsByPredicate, (state, { predicate }) => {
    return adapter.removeMany(predicate, state);
  }),
  on(ManifestActions.loadManifests, (state, { manifests }) => {
    return adapter.setAll(manifests, state);
  }),
  on(ManifestActions.clearManifests, state => {
    return adapter.removeAll({ ...state, selectedManifestId: null });
  }),
  on(ManifestActions.submitRequest, (state, { request }) => {
    return {
      ...state,
      processingRequests: request
    }
  }),
  on(ManifestActions.submitRequestSuccess, (state, { request, response, manifest }) => {
    return adapter.updateOne({
      id: manifest.name,
      changes: {
        entries: manifest.entries.map(entry => {
          if (entry.name === request.entryName) {
            return { ...entry, response }
          }
          return entry;
        })
      }
    }, {
      ...state,
      processingRequests: undefined
    });
  }),
  on(ManifestActions.submitRequestFailure, (state, { request, error, manifest }) => {
    return adapter.updateOne({
      id: manifest.name,
      changes: {
        entries: manifest.entries.map(entry => {
          if (entry.name === request.entryName) {
            return { ...entry, error }
          }
          return entry;
        })
      }
    }, {
      ...state,
      processingRequests: undefined
    });
  }),
  on(ManifestActions.queueRequest, (state, { request }) => {
    return {
      ...state,
      pendingRequests: state.pendingRequests.concat([{ ...request }]),
      processingRequests: undefined
    }
  }),
  on(ManifestActions.dequeueRequest, (state, { request }) => {
    return {
      ...state,
      pendingRequests: state.pendingRequests.filter(r => r.manifestName !== request.manifestName && r.entryName !== request.entryName)
    }
  })
);

export function reducer(state: State | undefined, action: Action) {
  return manifestReducer(state, action);
}

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

// select the array of manifest names
export const selectManifestNames = selectIds;

// select the dictionary of manifest entities
export const selectManifestEntities = selectEntities;

// select the array of manifests
export const selectAllManifests = selectAll;

// select the total manifest count
export const selectManifestTotal = selectTotal;

export const selectPendingRequests = (state: State) => state.pendingRequests
