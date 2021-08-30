import { Injectable } from '@angular/core';
import { createEffect, OnInitEffects } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { fromEvent } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { RootState, selectIsMobileLayout } from '../store';
import * as LayoutActions from './layout.actions';

@Injectable()
export class LayoutEffects implements OnInitEffects {

  constructor(private readonly store: Store<RootState>) {

  }

  resize = createEffect(() => fromEvent(window, 'resize')
    .pipe(
      withLatestFrom(this.store.pipe(select(selectIsMobileLayout))),
      switchMap(([event, isMobile]) => isMobile !== this.isMobile()
        ? [this.ngrxOnInitEffects()]
        : [])
    )
  );

  ngrxOnInitEffects(): Action {
    return LayoutActions.setIsMobile({
      isMobile: this.isMobile()
    });
  }

  /** A mapping method to map resize events to boolean.  */
  private readonly isMobile = (): boolean => window.innerWidth < 992;

}
