import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { combineLatest, of } from 'rxjs';
import { catchError, map, mergeMap, pluck, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { RootState } from '../store';
import { StompManifest } from './stomp-manifest';
import { StompManifestEntry } from './stomp-manifest-entry';
import * as StompManifestActions from './stomp-manifest.actions';
import { StompService } from '../stomp';

@Injectable()
export class StompManifestEffects {

  constructor(
    private readonly actions: Actions,
    private readonly store: Store<RootState>,
    private readonly stompService: StompService
  ) {

  }

  stompManifestAdded = createEffect(
    () => this.actions.pipe(
      ofType(StompManifestActions.addManifest),
      pluck('manifest'),
      map(manifest => StompManifestActions.connectManifest({ manifest }))
    )
  );

  connectManifest = createEffect(
    () => this.actions.pipe(
      ofType(StompManifestActions.connectManifest),
      pluck('manifest'),
      mergeMap(manifest => this.stompService.connect(manifest)
        .pipe(
          map(() => StompManifestActions.connectManifestSuccess({
            manifest
          })),
          catchError(() => of(StompManifestActions.connectManifestFailure({
            manifest
          })))
      ))
    )
  );

  connectManifestConnected = createEffect(
    () => this.actions.pipe(
      ofType(StompManifestActions.connectManifestConnected),
      pluck('manifest'),
      switchMap(manifest =>
        manifest.entries.map(entry =>
          StompManifestActions.subscribeManifest({
            manifest,
            entry
          })
        )
      )
    )
  );

  disconnectManifest = createEffect(
    () => this.actions.pipe(
      ofType(StompManifestActions.disconnectManifest),
      pluck('manifest'),
      mergeMap(manifest => this.stompService.disconnect(manifest)
        .pipe(
          map(() => StompManifestActions.disconnectManifestSuccess({
            manifest
          })),
          catchError(() => of(StompManifestActions.disconnectManifestFailure({
            manifest
          })))
      ))
    )
  );

  disconnectManifestDisconnected = createEffect(
    () => this.actions.pipe(
      ofType(StompManifestActions.disconnectManifestDisconnected),
      switchMap(action => this.stompService.deleteClient(action.manifest))
    ),
    {
      dispatch: false
    }
  );

  subscribeManifest = createEffect(
    () => this.actions.pipe(
      ofType(StompManifestActions.subscribeManifest),
      mergeMap(action => this.stompService.subscribe(action.manifest, action.entry)
        .pipe(
          map(subscription => StompManifestActions.subscribeManifestSuccess({
            manifest: action.manifest,
            entry: action.entry,
            subscription
          })),
          catchError(() => of(StompManifestActions.subscribeManifestFailure({
            entry: action.entry
          })))
      ))
    )
  );

  unsubscribeManifest = createEffect(
    () => this.actions.pipe(
      ofType(StompManifestActions.unsubscribeManifest),
      mergeMap(action => this.stompService.unsubscribe(action.manifest, action.entry.id)
        .pipe(
          map(subscription => StompManifestActions.unsubscribeManifestSuccess({
            manifest: action.manifest,
            entry: action.entry
          })),
          catchError(() => of(StompManifestActions.subscribeManifestFailure({
            entry: action.entry
          })))
      ))
    )
  );

  deleteClient = createEffect(
    () => this.actions.pipe(
      ofType(StompManifestActions.deleteClient),
      switchMap(action => this.stompService.deleteClient(action.manifest))
    ),
    {
      dispatch: false
    }
  );

}
