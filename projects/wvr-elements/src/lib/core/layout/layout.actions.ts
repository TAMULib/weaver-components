import { createAction, props } from '@ngrx/store';

export const setIsMobile = createAction(
  '[Layout] Set Mobile',
  props<{ isMobile: boolean }>()
);
