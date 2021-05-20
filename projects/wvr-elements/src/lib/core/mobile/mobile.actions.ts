import { createAction, props } from '@ngrx/store';

export const setMobileLayout = createAction(
  '[Mobile] Set Mobile',
  props<{ mobileLayout: boolean }>()
);
