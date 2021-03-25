import { createAction, props } from '@ngrx/store';
import { Wysiwyg } from './wysiwyg';

export const addWysiwyg = createAction(
  '[Wysiwyg] Add',
    props<{ wysiwyg: Wysiwyg }>()
);

export const saveWysiwyg = createAction(
  '[Wysiwyg] Save',
    props<{ id: string, content: string }>()
);

export const resetWysiwyg = createAction(
  '[Wysiwyg] Reset',
    props<{ id: string }>()
);
