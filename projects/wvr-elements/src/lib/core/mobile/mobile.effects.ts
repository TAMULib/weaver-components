import { Injectable } from '@angular/core';
import { createEffect, OnInitEffects } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { fromEvent } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { RootState, selectIsMobileLayout } from '../store';
import * as MobileActions from './mobile.actions';

@Injectable()
export class MobileEffects implements OnInitEffects {

  constructor(private readonly store: Store<RootState>) {

  }

  resize = createEffect(() => fromEvent(window, 'resize')
    .pipe(
      withLatestFrom(this.store.pipe(select(selectIsMobileLayout))),
      switchMap(([event, isMobileLayout]) => isMobileLayout !== this.isMobileLayout()
        ? [this.ngrxOnInitEffects()]
        : [])
    )
  );

  ngrxOnInitEffects(): Action {
    return MobileActions.setMobileLayout({
      mobileLayout: this.isMobileLayout()
    });
  }

  /** A mapping method to map resize events to boolean.  */
  private readonly isMobileLayout = (): boolean => window.innerWidth < 992;

}
