import { createAction, props } from '@ngrx/store';
import { ThemeVariants } from '../../shared/theme';

export const add = createAction(
  '[Theme] Add',
  props<{ name: string, theme: ThemeVariants }>()
);

export const select = createAction(
  '[Theme] Select',
  props<{ name: string}>()
);
