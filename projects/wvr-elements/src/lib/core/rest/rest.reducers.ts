import { createReducer, on } from '@ngrx/store';
import * as RestActions from './rest.actions';
import { Request } from './request';
​
export interface State {
  request: Request;
  response: any;
  error: any;
}
​
export const initialState: State = {
  request: undefined,
  response: undefined,
  error: undefined
};
​
export const reducer = createReducer(
  initialState,
  on(RestActions.request, (state, { request }) => ({
    ...state,
    request,
    response: undefined,
    error: undefined
  })),
  on(RestActions.requestSuccess, (state, { response }) => ({
    ...state,
    response
  })),
  on(RestActions.requestFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
