import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import * as JSON5 from 'json5';
import { RootState } from '../core/store';

import * as ThemeActions from '../core/theme/theme.actions';
import { ThemeVariants } from '../shared/theme';

@Component({
  selector: 'wvr-theme-component',
  template: '<ng-content></ng-content>'
})
export class WvrThemeComponent implements OnChanges {

  private _map: ThemeVariants;

  // tslint:disable-next-line: prefer-readonly
  @Input() private name: string;

  // tslint:disable-next-line: prefer-readonly
  @Input() set map(value: string) {
    this._map = JSON5.parse(value);
  }

  constructor(private readonly store: Store<RootState>) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.name && this._map) {
      this.store.dispatch(ThemeActions.add({
        name: this.name,
        theme: this._map
      }));
    }
  }

}
