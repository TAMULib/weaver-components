import { createReducer, on } from '@ngrx/store';
import * as ManifestActions from './manifest.actions';
import { WvrEntry } from './wvr-entry';
import { WvrEntryRequest } from './wvr-entry-request';
import { WvrManifest } from './wvr-manifest';
​
export interface State {
  manifests: Map<string, WvrManifest>;
  unassignedEntries: Array<WvrEntry>;
  pendingEntryRequests: Array<WvrEntryRequest>;
  liveEntryRequests: Array<WvrEntryRequest>;
}
​
export const initialState: State = {
  manifests: new Map<string, WvrManifest>(),
  unassignedEntries: new Array<WvrEntry>(),
  pendingEntryRequests: new Array<WvrEntryRequest>(),
  liveEntryRequests: new Array<WvrEntryRequest>()
};
​
export const reducer = createReducer(
  initialState,
  on(ManifestActions.addManifest, (state, { manifest }) => {

    manifest.entries = state.unassignedEntries
      .filter(e => e.manifestName === manifest.name);

    state.manifests.set(manifest.name, manifest);

    return {
      ...state,
      unassignedEntries: state.unassignedEntries
        .filter(e => e.manifestName !== manifest.name)
    };
  }),
  on(ManifestActions.addEntry, (state, { entry }) => {

    if (state.manifests.has(entry.manifestName)) {
      state.manifests.get(entry.manifestName)
        .entries
        .push(entry);
    } else {
      state.unassignedEntries.push(entry);
    }

    return {
      ...state
    };
  }),
  on(ManifestActions.invokeEntry, (state, { request }) => {

    // should be unique, maybe uuid
    request.id = Math.random();

    const entries = request.manifestName ?
                    state.manifests.get(request.manifestName).entries :
                    state.unassignedEntries;

    if (entries.filter(e => e.name === request.entryName).length === 0) {
      state.pendingEntryRequests.push(request);
    } else {
      state.liveEntryRequests.push(request);
    }

    return {
      ...state
    };
  }),
  on(ManifestActions.invokeEntrySuccess, (state, { request, response }) => {

    return {
      ...state,
      liveEntryRequests: state.liveEntryRequests.filter(lr => lr.id === request.id)
    };
  }),
  on(ManifestActions.invokeEntryFailure, (state, { request, error }) => {

    return {
      ...state,
      liveEntryRequests: state.liveEntryRequests.filter(lr => lr.id === request.id)
    };
  })
);
