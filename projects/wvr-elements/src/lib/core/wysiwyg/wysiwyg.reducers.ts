
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Wysiwyg } from './wysiwyg';
import * as WysiwygActions from './wysiwyg.actions';

export interface State extends EntityState<Wysiwyg> {}

export function selectWysiwygById(wysiwyg: Wysiwyg): string {
  return wysiwyg.id;
}

export const adapter: EntityAdapter<Wysiwyg> = createEntityAdapter<Wysiwyg>({
  selectId: selectWysiwygById
});

export const initialState: State = adapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(WysiwygActions.addWysiwyg, (state, { wysiwyg }) => adapter.addOne(wysiwyg, state)),
  on(WysiwygActions.saveWysiwyg, (state, { id, content }) => adapter.updateOne({
    id,
    changes: {
      initialContent: content,
      content
    }
  },
  {...state})),
  on(WysiwygActions.resetWysiwyg, (state, {id}) =>  adapter.updateOne({
    id,
    changes: {
      content: state.entities[id].initialContent
    }
  },
  {...state}))
);
