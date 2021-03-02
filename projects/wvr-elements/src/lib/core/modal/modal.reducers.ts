import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Modal } from './modal';
import * as ModalActions from './modal.actions';

export interface State extends EntityState<Modal> {
  modal: Modal;
}

export function selectModalByName(modal: Modal): string {
  return modal.name;
}

export const adapter: EntityAdapter<Modal> = createEntityAdapter<Modal>({
  selectId: selectModalByName
});

export const initialState: State = adapter.getInitialState({
  modal: {
    name: undefined,
    open: false
  }
});

export const reducer = createReducer(
  initialState,
  on(ModalActions.addModal, (state, { modal }) => adapter.addOne(modal, state)),
  on(ModalActions.openModal, (state, { modal }) => ({
    ...state,
    modal
  })),
  on(ModalActions.closeModal, (state, { modal }) => ({
    ...state,
    modal
  }))
);
