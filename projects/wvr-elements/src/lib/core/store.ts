import * as fromRest from './rest/rest.reducers';
import * as fromManifest from './manifest/manifest.reducers';
import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { InjectionToken } from '@angular/core';

export interface RootState {
  rest: fromRest.State;
  manifests: fromManifest.State;
}

export const reducers: ActionReducerMap<RootState> = {
  rest: fromRest.reducer,
  manifests: fromManifest.reducer
};

export const metaReducers: Array<MetaReducer<RootState>> = [];

export const selectRest = createFeatureSelector<RootState, fromRest.State>('rest');

export const selectResponse = createSelector(selectRest, (state: fromRest.State) => state.response);

export const selectManifests = createFeatureSelector<RootState, fromManifest.State>('manifests');

export const selectPendingEntryRequests = createSelector(selectManifests, (state: fromManifest.State) => state.pendingEntryRequests);

export const selectLiveEntryRequests = createSelector(selectManifests, (state: fromManifest.State) => state.liveEntryRequests);

export const ROOT_REDUCER = new InjectionToken<ActionReducerMap<RootState>>('Root Reducer', {
  factory: () => (reducers)
});
