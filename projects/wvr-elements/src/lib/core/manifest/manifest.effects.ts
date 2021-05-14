import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { combineLatest, of } from 'rxjs';
import { map, mergeMap, pluck, switchMap, take } from 'rxjs/operators';
import { RequestMethod } from '../rest/request-method';
import * as RestActions from '../rest/rest.actions';
import { RootState, selectManifestByName, selectManifestEntities, selectPendingRequests } from '../store';
import { Manifest } from './manifest';
import * as ManifestActions from './manifest.actions';

@Injectable()
export class ManifestEffects {

  constructor(private readonly actions: Actions, private readonly store: Store<RootState>) {

  }

  submitRequest = createEffect(
    () => this.actions.pipe(
      ofType(ManifestActions.submitRequest),
      pluck('request'),
      mergeMap(request => combineLatest([
        of(request),
        this.store.pipe(
          select(selectManifestByName(request.manifestName)),
          take(1)
        )
      ])),
      map(([request, manifest]) => {

        if (!manifest) {
          return ManifestActions.queueRequest({ request });
        }

        const entry = manifest.entries.find(e => e.name === request.entryName);

        if (!entry) {
          return ManifestActions.queueRequest({ request });
        }

        const method = request.method ? request.method : entry.methods[0];
        // TODO: validate method with allowed methods on manifests entry
        const url = manifest.baseUrl + entry.path;
        const options = { ...entry.options, ...request.options };
        const onSuccess = request.onSuccess ? request.onSuccess : [];
        const onFailure = request.onFailure ? request.onFailure : [];

        const restAction = this.requestsByMethod(method);

        return restAction({
          request: {
            url,
            method,
            options,
            body: request.body,
            bodyHttpParams: request.bodyHttpParams,
            map: entry.map
          },
          success: response => onSuccess.concat(ManifestActions.submitRequestSuccess({ manifest, request, response })),
          failure: error => onFailure.concat(ManifestActions.submitRequestFailure({ manifest, request, error }))
        });
      })
    ));

  dequeue = createEffect(
    () => this.actions.pipe(
      ofType(
        ManifestActions.addManifest,
        ManifestActions.setManifest,
        ManifestActions.upsertManifest,
        ManifestActions.addManifests,
        ManifestActions.upsertManifests,
        ManifestActions.updateManifest,
        ManifestActions.updateManifests
      ),
      mergeMap(request => combineLatest([
        this.store.pipe(
          select(selectManifestEntities),
          take(1)
        ),
        this.store.pipe(
          select(selectPendingRequests),
          take(1)
        )
      ])),
      switchMap(([manifests, pendingRequests]) => {
        const pendingRequestActions = [];

        pendingRequests.forEach(request => {
          const manifest: Manifest = manifests[request.manifestName];
          if (manifest) {
            const entry = manifest.entries.find(e => e.name === request.entryName);
            if (entry) {
              pendingRequestActions.push(ManifestActions.dequeueRequest({ request }));
            }
          }
        });

        return pendingRequestActions;
      })
    )
  );

  resubmitRequest = createEffect(
    () => this.actions.pipe(
      ofType(ManifestActions.dequeueRequest),
      pluck('request'),
      map(request => ManifestActions.submitRequest({ request }))
    )
  );

  private readonly requestsByMethod = (method: RequestMethod) => {
    switch (method) {
      case 'OPTIONS': return RestActions.optionsRequest;
      case 'POST': return RestActions.postRequest;
      case 'PUT': return RestActions.putRequest;
      case 'PATCH': return RestActions.patchRequest;
      case 'DELETE': return RestActions.deleteRequest;
      case 'GET': return RestActions.getRequest;
      default: return undefined;
    }
  };

}
