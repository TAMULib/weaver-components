import { EntityMapOne, Update } from '@ngrx/entity';
import { Modal } from './modal';
import * as fromModalActions from  './modal.actions';
import * as fromModalReducers from './modal.reducers';

describe('Modal Reducer', () => {
  const modal: Modal = {
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
      expect(fromModalReducers.selectModalByName(modal))
      .toEqual(modal.name);
    });
  });

});
