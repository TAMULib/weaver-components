import * as fromRest from './rest/rest.reducers';
import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { InjectionToken } from '@angular/core';

export interface RootState {
  rest: fromRest.State;
}

export const reducers: ActionReducerMap<RootState> = {
  rest: fromRest.reducer
};

export const metaReducers: Array<MetaReducer<RootState>> = [];

export const selectRest = createFeatureSelector<RootState, fromRest.State>('rest');

export const ROOT_REDUCER = new InjectionToken<ActionReducerMap<RootState>>('Root Reducer', {factory: () => ({
  rest: fromRest.reducer
})});
