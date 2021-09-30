import { EntityMap, EntityMapOne, Predicate, Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { StompManifest } from './stomp-manifest';
import { StompManifestEntry } from './stomp-manifest-entry';
import { StompManifestEntryMessage } from './stomp-manifest-entry-message';

export const addManifest = createAction('[Stomp Manifest] Add Manifest', props<{ manifest: StompManifest }>());
export const addManifests = createAction('[Stomp Manifest] Add Manifests', props<{ manifests: Array<StompManifest> }>());
export const clearManifests = createAction('[Stomp Manifest] Clear Manifests');
export const deleteManifest = createAction('[Stomp Manifest] Delete Manifest', props<{ id: string }>());
export const deleteManifests = createAction('[Stomp Manifest] Delete Manifests', props<{ ids: Array<string> }>());
export const loadManifests = createAction('[Stomp Manifest] Load Manifests', props<{ manifests: Array<StompManifest> }>());
export const mapManifest = createAction('[Stomp Manifest] Map Manifest', props<{ entityMap: EntityMapOne<StompManifest> }>());
export const mapManifests = createAction('[Stomp Manifest] Map Manifests', props<{ entityMap: EntityMap<StompManifest> }>());
export const setManifest = createAction('[Stomp Manifest] Set Manifest', props<{ manifest: StompManifest }>());
export const updateManifest = createAction('[Stomp Manifest] Update Manifest', props<{ update: Update<StompManifest> }>());
export const updateManifests = createAction('[Stomp Manifest] Update Manifests', props<{ updates: Array<Update<StompManifest>> }>());
export const upsertManifest = createAction('[Stomp Manifest] Upsert Manifest', props<{ manifest: StompManifest }>());
export const upsertManifests = createAction('[Stomp Manifest] Upsert Manifests', props<{ manifests: Array<StompManifest> }>());

export const deleteManifestsByPredicate = createAction(
  '[Stomp Manifest] Delete Manifests By Predicate',
  props<{
    predicate: Predicate<StompManifest>
  }>()
);

export const submitMessage = createAction(
  '[Stomp Manifest] Submit Message',
  props<{
    message: StompManifestEntryMessage
  }>()
);

export const submitMessageSuccess = createAction(
  '[Stomp Manifest] Submit Message Success',
  props<{
    manifest: StompManifest,
    message: StompManifestEntryMessage
  }>()
);

export const submitMessageFailure = createAction(
  '[Stomp Manifest] Submit Message Failure',
  props<{
    manifest: StompManifest,
    message: StompManifestEntryMessage
  }>()
);

export const queueMessage = createAction(
  '[Stomp Manifest] Queue Message',
  props<{
    message: StompManifestEntryMessage
  }>()
);

export const dequeueMessage = createAction(
  '[Stomp Manifest] Dequeue Message',
  props<{
    message: StompManifestEntryMessage
  }>()
);

export const connectManifest = createAction(
  '[Stomp Manifest] Connect',
  props<{
    manifest: StompManifest
  }>()
);

export const connectManifestSuccess = createAction(
  '[Stomp Manifest] Connect Success',
  props<{
    manifest: StompManifest
  }>()
);

export const connectManifestFailure = createAction(
  '[Stomp Manifest] Connect Failure',
  props<{
    manifest: StompManifest
  }>()
);

export const connectManifestConnected = createAction(
  '[Stomp Manifest] Connected',
  props<{
    manifest: StompManifest,
    frame: any
  }>()
);

export const disconnectManifest = createAction(
  '[Stomp Manifest] Disconnect',
  props<{
    manifest: StompManifest
  }>()
);

export const disconnectManifestSuccess = createAction(
  '[Stomp Manifest] Disconnect Success',
  props<{
    manifest: StompManifest
  }>()
);

export const disconnectManifestFailure = createAction(
  '[Stomp Manifest] Disconnect Failure',
  props<{
    manifest: StompManifest
  }>()
);

export const disconnectManifestDisconnected = createAction(
  '[Stomp Manifest] Disconnected',
  props<{
    manifest: StompManifest,
    frame: any
  }>()
);

export const subscribeManifest = createAction(
  '[Stomp Manifest] Subscribe',
  props<{
    manifest: StompManifest,
    entry: StompManifestEntry
  }>()
);

export const subscribeManifestSuccess = createAction(
  '[Stomp Manifest] Subscribe Success',
  props<{
    manifest: StompManifest,
    entry: StompManifestEntry,
    subscription: any
  }>()
);

export const subscribeManifestFailure = createAction(
  '[Stomp Manifest] Subscribe Failure',
  props<{
    entry: StompManifestEntry
  }>()
);

export const unsubscribeManifest = createAction(
  '[Stomp Manifest] Unsubscribe',
  props<{
    manifest: StompManifest,
    entry: StompManifestEntry
  }>()
);

export const unsubscribeManifestSuccess = createAction(
  '[Stomp Manifest] Unsubscribe Success',
  props<{
    manifest: StompManifest,
    entry: StompManifestEntry
  }>()
);

export const unsubscribeManifestFailure = createAction(
  '[Stomp Manifest] Unsubscribe Failure',
  props<{
    entry: StompManifestEntry
  }>()
);

export const receiveMessage = createAction(
  '[Stomp Manifest] Receive Message',
  props<{
    manifest: StompManifest,
    entry: StompManifestEntry,
    message: any
  }>()
);

export const deleteClient = createAction(
  '[Stomp Manifest] Delete Client',
  props<{
    manifest: StompManifest
  }>()
);
