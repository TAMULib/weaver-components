import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, pluck } from 'rxjs/operators';
import { RootState } from '../store';
import * as WysiwygActions from './wysiwyg.actions';
import { selectWysiwygById } from './wysiwyg.reducers';

@Injectable()
export class WysiwygEffects {

  constructor(private readonly actions: Actions, private readonly store: Store<RootState>) {

  }

  saveWysiwyg = createEffect(
    () => this.actions.pipe(
      ofType(WysiwygActions.saveWysiwyg)
    )
  );

  resetWysiwyg = createEffect(
    () => this.actions.pipe(
      ofType(WysiwygActions.resetWysiwyg)
    )
  );

}
