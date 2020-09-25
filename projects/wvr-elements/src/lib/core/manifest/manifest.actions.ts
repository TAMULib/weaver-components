import { createAction, props } from '@ngrx/store';
import { WvrEntry } from './wvr-entry';
import { WvrEntryRequest } from './wvr-entry-request';
import { WvrManifest } from './wvr-manifest';

export const addManifest = createAction(
  '[MANIFEST] Add Manifest',
  props<{
    manifest: WvrManifest
  }>()
);

export const addEntry = createAction(
  '[MANIFEST] Add Entry',
  props<{
    entry: WvrEntry
  }>()
);

export const invokeEntry = createAction(
  '[MANIFEST] Invoke Entry',
  props<{
    request: WvrEntryRequest
  }>()
);

export const invokeEntrySuccess = createAction(
  '[MANIFEST] Invoke Entry Success',
  props<{
    request: WvrEntryRequest,
    response: any
  }>()
);

export const invokeEntryFailure = createAction(
  '[MANIFEST] Invoke Entry Failure',
  props<{
    request: WvrEntryRequest,
    error: any
  }>()
);
