import { Wysiwyg } from './wysiwyg';
import * as fromWysiWygActions from './wysiwyg.actions';
import * as fromWysiwygReducers from './wysiwyg.reducers';

describe('Wysiwyg Reducer', () => {
  const initWysiwyg: Wysiwyg = {
    id: '1',
    initialContent: 'Hello, World!',
    content: 'Hello, World!'
  };

  describe('initial state', () => {
    it('should have an initial state', () => {
      const {initialState} = fromWysiwygReducers;
      const action = {} as any;
      expect(fromWysiwygReducers.reducer(undefined, action))
        .toBe(initialState);
    });
    it('should select wysiwyg by id', () => {
      expect(fromWysiwygReducers.selectWysiwygById(initWysiwyg))
      .toEqual(initWysiwyg.id);
    });

  });

});
