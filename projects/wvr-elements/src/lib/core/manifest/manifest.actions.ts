import { EntityMap, EntityMapOne, Predicate, Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Manifest } from './manifest';
import { ManifestEntryRequest } from './manifest-entry-request';

export const loadManifests = createAction('[Manifest] Load Manifests', props<{ manifests: Array<Manifest> }>());
export const addManifest = createAction('[Manifest] Add Manifest', props<{ manifest: Manifest }>());
export const setManifest = createAction('[Manifest] Set Manifest', props<{ manifest: Manifest }>());
export const upsertManifest = createAction('[Manifest] Upsert Manifest', props<{ manifest: Manifest }>());
export const addManifests = createAction('[Manifest] Add Manifests', props<{ manifests: Array<Manifest> }>());
export const upsertManifests = createAction('[Manifest] Upsert Manifests', props<{ manifests: Array<Manifest> }>());
export const updateManifest = createAction('[Manifest] Update Manifest', props<{ update: Update<Manifest> }>());
export const updateManifests = createAction('[Manifest] Update Manifests', props<{ updates: Array<Update<Manifest>> }>());
export const mapManifest = createAction('[Manifest] Map Manifest', props<{ entityMap: EntityMapOne<Manifest> }>());
export const mapManifests = createAction('[Manifest] Map Manifests', props<{ entityMap: EntityMap<Manifest> }>());
export const deleteManifest = createAction('[Manifest] Delete Manifest', props<{ id: string }>());
export const deleteManifests = createAction('[Manifest] Delete Manifests', props<{ ids: Array<string> }>());
export const deleteManifestsByPredicate = createAction(
  '[Manifest] Delete Manifests By Predicate',
  props<{ predicate: Predicate<Manifest> }>());
export const clearManifests = createAction('[Manifest] Clear Manifests');

export const submitRequest = createAction(
  '[Manifest] Submit Request',
  props<{
    request: ManifestEntryRequest
  }>()
);

export const submitRequestSuccess = createAction(
  '[Manifest] Submit Request Success',
  props<{
    manifest: Manifest,
    request: ManifestEntryRequest,
    response: any
  }>()
);

export const submitRequestFailure = createAction(
  '[Manifest] Submit Request Failure',
  props<{
    manifest: Manifest,
    request: ManifestEntryRequest,
    error: any
  }>()
);

export const queueRequest = createAction(
  '[Manifest] Queue Request',
  props<{
    request: ManifestEntryRequest
  }>()
);

export const dequeueRequest = createAction(
  '[Manifest] Dequeue Request',
  props<{
    request: ManifestEntryRequest
  }>()
);
