import * as fromRest from './rest/rest.reducers';
import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';

export interface AppState {
  rest: fromRest.State;
}

export const reducers: ActionReducerMap<AppState> = {
  rest: fromRest.reducer
};

export const metaReducers: Array<MetaReducer<AppState>> = [];

export const selectRest = createFeatureSelector<AppState, fromRest.State>('rest');
