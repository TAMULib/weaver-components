import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Request } from './request';
import * as RestActions from './rest.actions';
import { RestService } from './rest.service';

@Injectable()
export class RestEffects {

  constructor(
    private actions: Actions,
    private rest: RestService
  ) {

  }

  request = createEffect(
    () => this.actions.pipe(
      ofType(RestActions.request),
      switchMap(action => action.method(action.request)
        .pipe(
          map(response => RestActions.requestSuccess({
            response: action.request.map ? action.request.map(response) : response,
            success: action.success
          })),
          catchError(error => of(RestActions.requestFailure({
            error,
            failure: action.failure,
            retry: action
          })))
        ))
    )
  );

  requestSuccess = createEffect(
    () => this.actions.pipe(
      ofType(RestActions.requestSuccess),
      switchMap(action => action.success(action.response))
    )
  );

  requestFailure = createEffect(
    () => this.actions.pipe(
      ofType(RestActions.requestFailure),
      // tslint:disable-next-line:arrow-return-shorthand
      switchMap(action => {
        // TODO: handle error, refresh token, retry
        return action.failure(action.error);
      })
    )
  );

  optionsRequest = createEffect(
    () => this.actions.pipe(
      ofType(RestActions.optionsRequest),
      map(action => RestActions.request({
        request: action.request,
        method: this.options,
        success: action.success,
        failure: action.failure
      }))
    )
  );

  getRequest = createEffect(
    () => this.actions.pipe(
      ofType(RestActions.getRequest),
      map(action => RestActions.request({
        request: action.request,
        method: this.get,
        success: action.success,
        failure: action.failure
      }))
    )
  );

  postRequest = createEffect(
    () => this.actions.pipe(
      ofType(RestActions.postRequest),
      map(action => RestActions.request({
        request: action.request,
        method: this.post,
        success: action.success,
        failure: action.failure
      }))
    )
  );

  putRequest = createEffect(
    () => this.actions.pipe(
      ofType(RestActions.putRequest),
      map(action => RestActions.request({
        request: action.request,
        method: this.put,
        success: action.success,
        failure: action.failure
      }))
    )
  );

  patchRequest = createEffect(
    () => this.actions.pipe(
      ofType(RestActions.patchRequest),
      map(action => RestActions.request({
        request: action.request,
        method: this.patch,
        success: action.success,
        failure: action.failure
      }))
    )
  );

  deleteRequest = createEffect(
    () => this.actions.pipe(
      ofType(RestActions.deleteRequest),
      map(action => RestActions.request({
        request: action.request,
        method: this.delete,
        success: action.success,
        failure: action.failure
      }))
    )
  );

  private options = (request: Request): Observable<any> => this.rest.options(request);

  private get = (request: Request): Observable<any> => this.rest.get(request);

  private post = (request: Request): Observable<any> => this.rest.post(request);

  private put = (request: Request): Observable<any> => this.rest.put(request);

  private patch = (request: Request): Observable<any> => this.rest.patch(request);

  private delete = (request: Request): Observable<any> => this.rest.delete(request);

}
