import { createReducer, on } from '@ngrx/store';
import * as RestActions from './rest.actions';
import { Request } from './request';
​
export interface State {
  request: Request;
  response: any;
}
​
export const initialState: State = {
  request: undefined,
  response: undefined
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
  on(RestActions.requestFailure, (state, { response }) => ({
    ...state,
    response
  }))
);

export const selectRequest = (state: State) => state.request;

export const selectResponse = (state: State) => state.response;
