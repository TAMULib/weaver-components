/* istanbul ignore file */

/* TODO: Issue #292. */
import { InjectionToken } from '@angular/core';
import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { Manifest } from './manifest/manifest';
import { ManifestEntry } from './manifest/manifest-entry';
import * as fromManifest from './manifest/manifest.reducers';
import * as fromRest from './rest/rest.reducers';
import * as fromTheme from './theme/theme.reducers';
import * as fromLayout from './layout/layout.reducers';
import * as fromModal from './modal/modal.reducers';
import * as fromWysiwyg from './wysiwyg/wysiwyg.reducers';

export interface RootState {
  layout: fromLayout.State;
  manifests: fromManifest.State;
  modals: fromModal.State;
  rest: fromRest.State;
  theme: fromTheme.State;
  wysiwyg: fromWysiwyg.State;
}

export const initialState: RootState = {
  layout: fromLayout.initialState,
  manifests: fromManifest.initialState,
  modals: fromModal.initialState,
  rest: fromRest.initialState,
  theme: fromTheme.initialState,
  wysiwyg: fromWysiwyg.initialState
};

export const reducers: ActionReducerMap<RootState> = {
  layout: fromLayout.reducer,
  manifests: fromManifest.reducer,
  modals: fromModal.reducer,
  rest: fromRest.reducer,
  theme: fromTheme.reducer,
  wysiwyg: fromWysiwyg.reducer
};

export const ROOT_REDUCER = new InjectionToken<ActionReducerMap<RootState>>('Root Reducer', {
  factory: () => (reducers)
});

export const metaReducers: Array<MetaReducer<RootState>> = [];

// manifest selectors
export const selectManifestState = createFeatureSelector<RootState, fromManifest.State>('manifests');

// rest selectors
export const selectRestState = createFeatureSelector<RootState, fromRest.State>('rest');

export const selectRestRequest = createSelector(
  selectRestState,
  fromRest.selectRequest
);

export const selectRestResponse = createSelector(
  selectRestState,
  fromRest.selectResponse
);

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

// layout selectors
export const selectLayoutState = createFeatureSelector<RootState, fromLayout.State>('layout');

// TODO - determine how to pass states into tests without requiring null checks.
export const selectIsMobileLayout = createSelector(
  selectLayoutState,
  (layoutState: fromLayout.State) => layoutState?.layout.isMobile
);

// modal selectors
export const selectModalState = createFeatureSelector<RootState, fromModal.State>('modals');

export const selectModalByName = (modalName: string) => createSelector(
  selectModalState,
  (modalState: fromModal.State) => modalState.entities[modalName]
);

// wysiwyg selectors
export const selectWysiwygState = createFeatureSelector<RootState, fromWysiwyg.State>('wysiwyg');

// TODO - determine how to pass states into tests without requiring null checks.
export const selectWysiwygById = (id: string) => createSelector(
  selectWysiwygState,
  (wysiwygState: fromWysiwyg.State) => wysiwygState?.entities[id]
);
