import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { combineLatest, of } from 'rxjs';
import { catchError, map, mergeMap, pluck, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { RootState } from '../store';
import { MessageManifest } from './message-manifest';
import { MessageManifestEntry } from './message-manifest-entry';
import * as MessageManifestActions from './message-manifest.actions';
import { MessageService } from '../message';

/* disable test coverage until a strategy for testing effects can be determined. */
/* istanbul ignore file */
@Injectable()
export class MessageManifestEffects {

  constructor(
    private readonly actions: Actions,
    private readonly store: Store<RootState>,
    private readonly messageService: MessageService
  ) {

  }

  messageManifestAdded = createEffect(
    () => this.actions.pipe(
      ofType(MessageManifestActions.addManifest),
      pluck('manifest'),
      map(manifest => MessageManifestActions.connectManifest({ manifest }))
    )
  );

  connectManifest = createEffect(
    () => this.actions.pipe(
      ofType(MessageManifestActions.connectManifest),
      pluck('manifest'),
      mergeMap(manifest => this.messageService.connect(manifest)
        .pipe(
          map(() => MessageManifestActions.connectManifestSuccess({
            manifest
          })),
          catchError(() => of(MessageManifestActions.connectManifestFailure({
            manifest
          })))
      ))
    )
  );

  connectManifestConnected = createEffect(
    () => this.actions.pipe(
      ofType(MessageManifestActions.connectManifestConnected),
      pluck('manifest'),
      switchMap(manifest =>
        manifest.entries.map(entry =>
          MessageManifestActions.subscribeManifest({
            manifest,
            entry
          })
        )
      )
    )
  );

  disconnectManifest = createEffect(
    () => this.actions.pipe(
      ofType(MessageManifestActions.disconnectManifest),
      pluck('manifest'),
      mergeMap(manifest => this.messageService.disconnect(manifest)
        .pipe(
          map(() => MessageManifestActions.disconnectManifestSuccess({
            manifest
          })),
          catchError(() => of(MessageManifestActions.disconnectManifestFailure({
            manifest
          })))
      ))
    )
  );

  disconnectManifestDisconnected = createEffect(
    () => this.actions.pipe(
      ofType(MessageManifestActions.disconnectManifestDisconnected),
      switchMap(action => this.messageService.deleteClient(action.manifest))
    ),
    {
      dispatch: false
    }
  );

  subscribeManifest = createEffect(
    () => this.actions.pipe(
      ofType(MessageManifestActions.subscribeManifest),
      mergeMap(action => this.messageService.subscribe(action.manifest, action.entry)
        .pipe(
          map(subscription => MessageManifestActions.subscribeManifestSuccess({
            manifest: action.manifest,
            entry: action.entry,
            subscription
          })),
          catchError(() => of(MessageManifestActions.subscribeManifestFailure({
            entry: action.entry
          })))
      ))
    )
  );

  unsubscribeManifest = createEffect(
    () => this.actions.pipe(
      ofType(MessageManifestActions.unsubscribeManifest),
      mergeMap(action => this.messageService.unsubscribe(action.manifest, action.entry.id)
        .pipe(
          map(subscription => MessageManifestActions.unsubscribeManifestSuccess({
            manifest: action.manifest,
            entry: action.entry
          })),
          catchError(() => of(MessageManifestActions.subscribeManifestFailure({
            entry: action.entry
          })))
      ))
    )
  );

  deleteClient = createEffect(
    () => this.actions.pipe(
      ofType(MessageManifestActions.deleteClient),
      switchMap(action => this.messageService.deleteClient(action.manifest))
    ),
    {
      dispatch: false
    }
  );

}
