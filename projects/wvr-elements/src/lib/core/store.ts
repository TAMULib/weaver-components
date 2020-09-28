import { InjectionToken } from '@angular/core';
import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { Manifest } from './manifest/manifest';
import { ManifestEntry } from './manifest/manifest-entry';
import * as fromManifest from './manifest/manifest.reducers';
import * as fromRest from './rest/rest.reducers';

export interface RootState {
  rest: fromRest.State;
  manifests: fromManifest.State;
}

export const reducers: ActionReducerMap<RootState> = {
  rest: fromRest.reducer,
  manifests: fromManifest.reducer
};

export const ROOT_REDUCER = new InjectionToken<ActionReducerMap<RootState>>('Root Reducer', {
  factory: () => (reducers)
});

export const metaReducers: Array<MetaReducer<RootState>> = [];

// rest selectors
export const selectRestState = createFeatureSelector<RootState, fromRest.State>('rest');


// manifest selectors
export const selectManifestState = createFeatureSelector<RootState, fromManifest.State>('manifests');

export const selectManifestNames = createSelector(
  selectManifestState,
  fromManifest.selectManifestNames
);
export const selectManifestEntities = createSelector(
  selectManifestState,
  fromManifest.selectManifestEntities
);
export const selectAllManifests = createSelector(
  selectManifestState,
  fromManifest.selectAllManifests
);
export const selectManifestTotal = createSelector(
  selectManifestState,
  fromManifest.selectManifestTotal
);

export const selectCurrentRequest = createSelector(
  selectManifestState,
  fromManifest.selectCurrentRequest
);

export const selectPendingRequests = createSelector(
  selectManifestState,
  fromManifest.selectPendingRequests
);

export const selectManifestByName = (manifestName: string) => createSelector(
  selectManifestEntities,
  (manifestEntities) => manifestEntities[manifestName]
);

export const selectManifestEntryResponse = (manifestName: string, entryName: string) => createSelector(
  selectManifestEntities,
  (manifestEntities) => {
    if (manifestEntities[manifestName]) {
      const manifestEntry = findManifestEntry(manifestEntities[manifestName], entryName);
      return manifestEntry ? manifestEntry.response : undefined;
    }
    return undefined;
  }
);

export const selectManifestEntryError = (manifestName: string, entryName: string) => createSelector(
  selectManifestEntities,
  (manifestEntities) => {
    if (manifestEntities[manifestName]) {
      const manifestEntry = findManifestEntry(manifestEntities[manifestName], entryName);
      return manifestEntry ? manifestEntry.error : undefined;
    }
    return undefined;
  }
);

const findManifestEntry = (manifest: Manifest, entryName: string): ManifestEntry => {
  return manifest.entries.find(e => e.name === entryName);
}
