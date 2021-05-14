import { EntityMapOne, Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { actions } from '../actions';
import { Modal } from './modal';
import * as fromModalActions from  './modal.actions';
import * as fromModalReducers from './modal.reducers';

describe('Modal Reducer', () => {
  const initModal: Modal = {
    name: 'Test Modal',
    open: false
  };

  describe('initial state', () => {
    it('should have an initial state', () => {
      const {initialState} = fromModalReducers;
      const action = {} as any;
      expect(fromModalReducers.reducer(undefined, action))
        .toBe(initialState);
    });
    it('should select manifest by name', () => {
      expect(fromModalReducers.selectModalByName(initModal))
      .toEqual(initModal.name);
    });

  });

  const state = {ids: [], entities: {}};
  const modal: Modal = {
    name: 'Add a Modal',
    open: false
  };
  const action = fromModalActions.addModal({modal});
  const addReducerObj = fromModalReducers.reducer(state, action );

  it(' should add modal', () => {
    expect(JSON.stringify(addReducerObj.entities[modal.name].name) === JSON.stringify(modal.name) )
      .toBe(true);
  });

  const openState = {
    ids: ['OpenModal'],
    entities: {
      'OpenModal': {
        name: 'OpenModal',open: false
      }
    }
  };

  const openModalReducerObj = fromModalReducers.reducer(openState, fromModalActions.openModal({ id: 'OpenModal' }) );
  Object.keys( openModalReducerObj['entities']['OpenModal']).forEach( key => {
    if(key === 'open') {
      it(' should be able to open modal', () => {
        expect((JSON.stringify(openModalReducerObj['entities']['OpenModal']['open']) === "true"))
          .toBeTrue();
      });
    }
  });
});
