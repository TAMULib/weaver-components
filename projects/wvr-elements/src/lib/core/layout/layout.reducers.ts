import { createReducer, on } from '@ngrx/store';
import { Layout } from './layout';
import * as LayoutActions from './layout.actions';

export interface State {
  layout: Layout;
}

export const initialState: State = {
  layout: { isMobile: false }
};

export const reducer = createReducer(
  initialState,
  on(LayoutActions.setIsMobile, (state, { isMobile }) => ({
    ...state,
    layout: {
      ...state.layout,
      isMobile
    }
  }))
);
