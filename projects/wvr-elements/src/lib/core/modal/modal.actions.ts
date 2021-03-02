import { createAction, props } from '@ngrx/store';
import { Modal } from './modal';

export const addModal = createAction('[Modal] Add Modal', props<{ modal: Modal }>());
export const openModal = createAction('[Modal] Open Modal', props<{ modal: Modal }>());
export const closeModal = createAction('[Modal] Close Modal', props<{ modal: Modal }>());
