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

  const state = {ids: [], entities: {}};
  const wysiwyg: Wysiwyg = {
    id: '1',
    initialContent: 'Hello, World!',
    content: 'Hello, World!'
  };
  const action = fromWysiWygActions.addWysiwyg({wysiwyg});
  const addReducerObj = fromWysiwygReducers.reducer(state, action );

  it(' should add wysiwyg', () => {
    expect(JSON.stringify(addReducerObj.entities[wysiwyg.id].id) === JSON.stringify(wysiwyg.id) )
      .toBe(true);
  });

  const saveWysiwygState = {
    ids: [
      '148'
    ],
    entities: {
      '148': {
        id: '148',
        initialContent: 'Hello, World!',
        content: 'Hello, World!'
      }
    }
  };

  // save wysiwyg
  const saveWysiwygReducerObj = fromWysiwygReducers.reducer(saveWysiwygState,
    fromWysiWygActions.saveWysiwyg({id: '148', content: 'Updated Text'}));

  Object.keys( saveWysiwygReducerObj['entities']['148']).forEach( key => {
    if(key === 'content') {
      it(' should be able to save content', () => {
        expect((JSON.stringify(saveWysiwygReducerObj['entities']['148']['content']) === '"Updated Text"'))
          .toBeTrue();
      });
    }
  });

  // reset wysiwyg
  const resetWysiwygReducerObj = fromWysiwygReducers.reducer(saveWysiwygState,
    fromWysiWygActions.saveWysiwyg({id: '148', content: 'Hello, World!'}));
  Object.keys( resetWysiwygReducerObj['entities']['148']).forEach( key => {
    if(key === 'content') {
      it(' should be able to reset content', () => {
        expect((JSON.stringify(resetWysiwygReducerObj['entities']['148']['content']) === '"Hello, World!"'))
          .toBeTrue();
      });
    }
  });
});
