/* istanbul ignore file */

import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import * as JSON5 from 'json5';
import { RootState } from '../core/store';
import * as ThemeActions from '../core/theme/theme.actions';
import { ThemeVariants } from '../shared/theme';

@Component({
  selector: 'wvr-theme-component',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.Default
})
export class WvrThemeComponent implements OnChanges {

  private _variants: ThemeVariants;

  // tslint:disable-next-line: prefer-readonly
  @Input() private name: string;

  // tslint:disable-next-line: prefer-readonly
  @Input() private active = false;

  // tslint:disable-next-line: prefer-readonly
  @Input() set variants(value: string) {
    this._variants = JSON5.parse(value);
  }

  constructor(private readonly store: Store<RootState>) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.name && this._variants) {
      this.store.dispatch(ThemeActions.add({
        name: this.name,
        theme: this._variants
      }));
    }

    if (this.name && this.active) {
      this.store.dispatch(ThemeActions.select({
        name: this.name
      }));
    }

  }

}
