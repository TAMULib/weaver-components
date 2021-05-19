import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Modal } from './modal';
import * as ModalActions from './modal.actions';

export interface State extends EntityState<Modal> {}

export function selectModalByName(modal: Modal): string {
  return modal.name;
}

export const adapter: EntityAdapter<Modal> = createEntityAdapter<Modal>({
  selectId: selectModalByName
});

export const initialState: State = adapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(ModalActions.addModal, (state, { modal }) => adapter.addOne(modal, state)),
  on(ModalActions.closeModal, (state, { id }) => adapter.updateOne({
    id,
    changes: {
      open: false
    }
  }, {
    ...state
  })),
  on(ModalActions.openModal, (state, { id }) => adapter.updateOne({
    id,
    changes: {
      open: true
    }
  }, {
    ...state
  }))
);
