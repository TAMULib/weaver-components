import { createAction, props } from '@ngrx/store';
import { Modal } from './modal';

export const addModal = createAction('[Modal] Add Modal', props<{ modal: Modal }>());
export const openModal = createAction('[Modal] Open Modal', props<{ id: string }>());
export const closeModal = createAction('[Modal] Close Modal', props<{ id: string }>());
