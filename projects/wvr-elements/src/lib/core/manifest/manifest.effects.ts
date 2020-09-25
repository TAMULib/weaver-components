import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import * as RestActions from '../rest/rest.actions';
import { RootState, selectLiveEntryRequests, selectPendingEntryRequests } from '../store';
import * as ManifestActions from './manifest.actions';

@Injectable()
export class ManifestEffects {
​
  constructor(private actions: Actions, private store: Store<RootState>) {
  }

  addEntry = createEffect(
    () => this.actions.pipe(
      ofType(ManifestActions.addEntry),
      withLatestFrom(this.store.pipe(select(selectPendingEntryRequests))),
      switchMap(([action, pendingEntryRequests]) => pendingEntryRequests
          .filter(request => action.entry.name === request.entryName)
          .map(request => ManifestActions.invokeEntry({request})))
    )
  );

  invokeEntry = createEffect(
    () => this.actions.pipe(
      ofType(ManifestActions.addEntry),
      withLatestFrom(this.store.pipe(select(selectLiveEntryRequests))),
      switchMap(([action, liveEntryRequests]) => liveEntryRequests
          .filter(request => action.entry.name === request.entryName)
          .map(request => {
            let restAction;

            switch (action.entry.requestManifest.method) {
              case 'POST':
                restAction = RestActions.postRequest;
                break;
              case 'DELETE':
                restAction = RestActions.deleteRequest;
                break;
              case 'PUT':
                restAction = RestActions.putRequest;
                break;
              case 'GET':
              default:
                restAction = RestActions.getRequest;
            }

            return restAction({
              request,
              success: request.onSuccess.concat(),
              failure: request.onFailure
            });

          }))
    )
  );
​
}
