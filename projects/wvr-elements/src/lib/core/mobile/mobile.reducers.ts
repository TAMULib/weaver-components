import { createReducer, on } from '@ngrx/store';
import { Mobile } from './mobile';
import * as MobileActions from './mobile.actions';

export interface State {
  mobile: Mobile;
}

export const initialState: State = {
  mobile: { mobileLayout: false }
};

export const reducer = createReducer(
  initialState,
  on(MobileActions.setMobileLayout, (state, { mobileLayout }) => ({
    ...state,
    mobile: {
      ...state.mobile,
      mobileLayout
    }
  }))
);
