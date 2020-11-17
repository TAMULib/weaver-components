import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { ThemeService } from './theme.service';

@Injectable()
export class ThemeEffects {

  constructor(
    private readonly actions: Actions,
    private readonly themeService: ThemeService
  ) {

  }

}
