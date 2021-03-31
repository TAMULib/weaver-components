/* istanbul ignore file */

/* TODO: Issue #292. */
import { InjectionToken } from '@angular/core';
import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { Manifest } from './manifest/manifest';
import { ManifestEntry } from './manifest/manifest-entry';
import * as fromManifest from './manifest/manifest.reducers';
import * as fromRest from './rest/rest.reducers';
import * as fromTheme from './theme/theme.reducers';
import * as fromModal from './modal/modal.reducers';

export interface RootState {
  manifests: fromManifest.State;
  rest: fromRest.State;
  theme: fromTheme.State;
  modals: fromModal.State;
}

export const reducers: ActionReducerMap<RootState> = {
  manifests: fromManifest.reducer,
  rest: fromRest.reducer,
  theme: fromTheme.reducer,
  modals: fromModal.reducer
};

export const ROOT_REDUCER = new InjectionToken<ActionReducerMap<RootState>>('Root Reducer', {
  factory: () => (reducers)
});

export const metaReducers: Array<MetaReducer<RootState>> = [];

// manifest selectors
export const selectManifestState = createFeatureSelector<RootState, fromManifest.State>('manifests');

// rest selectors
export const selectRestState = createFeatureSelector<RootState, fromRest.State>('rest');

// theme selectors
export const selectThemeState = createFeatureSelector<RootState, fromTheme.State>('theme');

const findManifestEntry = (manifest: Manifest, entryName: string): ManifestEntry => manifest.entries.find(e => e.name === entryName);

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
  manifestEntities => manifestEntities[manifestName]
);

export const selectManifestEntryResponse = (manifestName: string, entryName: string) => createSelector(
  selectManifestEntities,
  manifestEntities => {
    if (manifestEntities[manifestName]) {
      const manifestEntry = findManifestEntry(manifestEntities[manifestName], entryName);

      return manifestEntry ? manifestEntry.response : undefined;
    }

    return undefined;
  }
);

export const selectManifestEntryError = (manifestName: string, entryName: string) => createSelector(
  selectManifestEntities,
  manifestEntities => {
    if (manifestEntities[manifestName]) {
      const manifestEntry = findManifestEntry(manifestEntities[manifestName], entryName);

      return manifestEntry ? manifestEntry.error : undefined;
    }

    return undefined;
  }
);

export const selectTheme = (name: string) => createSelector(
  selectThemeState,
  (themeState: fromTheme.State) => themeState.themes[name]
);

export const selectCurrentTheme = createSelector(
  selectThemeState,
  (themeState: fromTheme.State) => themeState.themes[themeState.currentTheme]
);

export const selectModalState = createFeatureSelector<RootState, fromModal.State>('modals');

export const selectModalByName = (modalName: string) => createSelector(
  selectModalState,
  modals => modals[modalName]
);
