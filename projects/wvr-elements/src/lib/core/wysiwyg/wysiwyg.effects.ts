import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { RootState } from '../store';

@Injectable()
export class WysiwygEffects {

  constructor(private readonly actions: Actions, private readonly store: Store<RootState>) {

  }

}
