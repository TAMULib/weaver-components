import { HttpErrorResponse } from '@angular/common/http';
import { Action, createAction, props } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Request } from './request';

// TODO: remove to centralized export
type method = (request: Request) => Observable<any>;
type success = (response: any) => Array<Action>;
type failure = (response: any) => Array<Action>;

export const request = createAction(
  '[REST] Request',
  props<{
    request: Request,
    method: method,
    success: success,
    failure: failure
  }>()
);

export const storeRequest = createAction(
  '[REST] Store Request',
  props<{ request: Request }>()
);

export const requestSuccess = createAction(
  '[REST] Request Success',
  props<{
    response: any,
    success: success
  }>()
);

export const requestFailure = createAction(
  '[REST] Request Failure',
  props<{
    response: HttpErrorResponse,
    failure: failure
    retry: Action
  }>()
);

export const optionsRequest = createAction(
  '[REST] Options',
  props<{
    request: Request,
    success: success,
    failure: failure
  }>()
);

export const getRequest = createAction(
  '[REST] Get',
  props<{
    request: Request,
    success: success,
    failure: failure
  }>()
);

export const postRequest = createAction(
  '[REST] Post',
  props<{
    request: Request,
    success: success,
    failure: failure
  }>()
);

export const putRequest = createAction(
  '[REST] Put',
  props<{
    request: Request,
    success: success,
    failure: failure
  }>()
);

export const patchRequest = createAction(
  '[REST] Patch',
  props<{
    request: Request,
    success: success,
    failure: failure
  }>()
);

export const deleteRequest = createAction(
  '[REST] Delete',
  props<{
    request: Request,
    success: success,
    failure: failure
  }>()
);

export const logResponse = createAction(
  '[REST] Log',
  props<{
    response: any
  }>()
);
