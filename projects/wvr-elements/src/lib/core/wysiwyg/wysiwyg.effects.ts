import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { WysiwygService } from './wysiwyg.service';

@Injectable()
export class ModalEffects {

  constructor(
    private readonly actions: Actions,
    private readonly wysiwygService: WysiwygService
  ) {

 }

}
