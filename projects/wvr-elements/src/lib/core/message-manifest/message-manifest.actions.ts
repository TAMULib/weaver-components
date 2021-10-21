import { EntityMap, EntityMapOne, Predicate, Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { MessageManifest } from './message-manifest';
import { MessageManifestEntry } from './message-manifest-entry';
import { MessageManifestEntryMessage } from './message-manifest-entry-message';

export const addManifest = createAction('[Message Manifest] Add Manifest', props<{ manifest: MessageManifest }>());
export const addManifests = createAction('[Message Manifest] Add Manifests', props<{ manifests: Array<MessageManifest> }>());
export const clearManifests = createAction('[Message Manifest] Clear Manifests');
export const deleteManifest = createAction('[Message Manifest] Delete Manifest', props<{ id: string }>());
export const deleteManifests = createAction('[Message Manifest] Delete Manifests', props<{ ids: Array<string> }>());
export const loadManifests = createAction('[Message Manifest] Load Manifests', props<{ manifests: Array<MessageManifest> }>());
export const mapManifest = createAction('[Message Manifest] Map Manifest', props<{ entityMap: EntityMapOne<MessageManifest> }>());
export const mapManifests = createAction('[Message Manifest] Map Manifests', props<{ entityMap: EntityMap<MessageManifest> }>());
export const setManifest = createAction('[Message Manifest] Set Manifest', props<{ manifest: MessageManifest }>());
export const updateManifest = createAction('[Message Manifest] Update Manifest', props<{ update: Update<MessageManifest> }>());
export const updateManifests = createAction('[Message Manifest] Update Manifests', props<{ updates: Array<Update<MessageManifest>> }>());
export const upsertManifest = createAction('[Message Manifest] Upsert Manifest', props<{ manifest: MessageManifest }>());
export const upsertManifests = createAction('[Message Manifest] Upsert Manifests', props<{ manifests: Array<MessageManifest> }>());

export const deleteManifestsByPredicate = createAction(
  '[Message Manifest] Delete Manifests By Predicate',
  props<{
    predicate: Predicate<MessageManifest>
  }>()
);

export const submitMessage = createAction(
  '[Message Manifest] Submit Message',
  props<{
    message: MessageManifestEntryMessage
  }>()
);

export const submitMessageSuccess = createAction(
  '[Message Manifest] Submit Message Success',
  props<{
    manifest: MessageManifest,
    message: MessageManifestEntryMessage
  }>()
);

export const submitMessageFailure = createAction(
  '[Message Manifest] Submit Message Failure',
  props<{
    manifest: MessageManifest,
    message: MessageManifestEntryMessage
  }>()
);

export const queueMessage = createAction(
  '[Message Manifest] Queue Message',
  props<{
    message: MessageManifestEntryMessage
  }>()
);

export const dequeueMessage = createAction(
  '[Message Manifest] Dequeue Message',
  props<{
    message: MessageManifestEntryMessage
  }>()
);

export const connectManifest = createAction(
  '[Message Manifest] Connect',
  props<{
    manifest: MessageManifest
  }>()
);

export const connectManifestSuccess = createAction(
  '[Message Manifest] Connect Success',
  props<{
    manifest: MessageManifest
  }>()
);

export const connectManifestFailure = createAction(
  '[Message Manifest] Connect Failure',
  props<{
    manifest: MessageManifest
  }>()
);

export const connectManifestConnected = createAction(
  '[Message Manifest] Connected',
  props<{
    manifest: MessageManifest,
    frame: any
  }>()
);

export const disconnectManifest = createAction(
  '[Message Manifest] Disconnect',
  props<{
    manifest: MessageManifest
  }>()
);

export const disconnectManifestSuccess = createAction(
  '[Message Manifest] Disconnect Success',
  props<{
    manifest: MessageManifest
  }>()
);

export const disconnectManifestFailure = createAction(
  '[Message Manifest] Disconnect Failure',
  props<{
    manifest: MessageManifest
  }>()
);

export const disconnectManifestDisconnected = createAction(
  '[Message Manifest] Disconnected',
  props<{
    manifest: MessageManifest,
    frame: any
  }>()
);

export const subscribeManifest = createAction(
  '[Message Manifest] Subscribe',
  props<{
    manifest: MessageManifest,
    entry: MessageManifestEntry
  }>()
);

export const subscribeManifestSuccess = createAction(
  '[Message Manifest] Subscribe Success',
  props<{
    manifest: MessageManifest,
    entry: MessageManifestEntry,
    subscription: any
  }>()
);

export const subscribeManifestFailure = createAction(
  '[Message Manifest] Subscribe Failure',
  props<{
    entry: MessageManifestEntry
  }>()
);

export const unsubscribeManifest = createAction(
  '[Message Manifest] Unsubscribe',
  props<{
    manifest: MessageManifest,
    entry: MessageManifestEntry
  }>()
);

export const unsubscribeManifestSuccess = createAction(
  '[Message Manifest] Unsubscribe Success',
  props<{
    manifest: MessageManifest,
    entry: MessageManifestEntry
  }>()
);

export const unsubscribeManifestFailure = createAction(
  '[Message Manifest] Unsubscribe Failure',
  props<{
    entry: MessageManifestEntry
  }>()
);

export const receiveMessage = createAction(
  '[Message Manifest] Receive Message',
  props<{
    manifest: MessageManifest,
    entry: MessageManifestEntry,
    message: any
  }>()
);

export const deleteClient = createAction(
  '[Message Manifest] Delete Client',
  props<{
    manifest: MessageManifest
  }>()
);
